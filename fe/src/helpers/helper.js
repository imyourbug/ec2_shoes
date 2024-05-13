import { useToasted } from '@hoppscotch/vue-toasted';

const toast = useToasted();
const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;

function formatCash(str) {
  str = str.toString();
  if (str && str !== "0") {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  }

  return str;
}

function traverse(arr, parentId) {
  arr
    .filter((node) => node.parentId === parentId)
    .reduce(
      (result, current) => [
        ...result,
        {
          ...current,
          children: traverse(arr, current.id),
        },
      ],
      []
    );
}

function parseTree(arr) {
  arr
    .sort(({ order }) => order)
    .filter(({ parentId }) => !parentId)
    .map((node) => ({
      ...node,
      children: traverse(arr, node.id),
    }));
}

function showPrice(price, price_sale) {
  if (price_sale !== null) {
    return `${formatCash(
      price_sale
    )}đ <sup style="text-decoration-line:line-through; opacity:0.6">${formatCash(
      price
    )}đ</sup>`;
  }
  return `${formatCash(price)}đ`;
}

function convertDateTime(inputDateTime) {
  // Chuyển đổi chuỗi ngày giờ thành đối tượng Date
  const dateObj = new Date(inputDateTime);

  // Lấy thông tin về giờ, phút, giây
  const hours = String(dateObj.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");

  // Lấy thông tin về ngày, tháng, năm
  const year = String(dateObj.getUTCFullYear());
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
  const day = String(dateObj.getUTCDate()).padStart(2, "0");

  // Trả về chuỗi kết quả dạng His Ymd
  return (
    hours + ":" + minutes + ":" + seconds + " " + day + "-" + month + "-" + year
  );
}

function setCookie(name, value, daysToExpire) {
  const expires = new Date();
  expires.setTime(expires.getTime() + daysToExpire * 24 * 60 * 60 * 1000); // Calculate expiration time

  // Format the cookie string with the name, value, and expiration
  const cookieString = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/`;

  // Set the cookie in the browser
  document.cookie = cookieString;
}

function getCookie(name) {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();

    if (cookie.startsWith(cookieName)) {
      return cookie.substring(cookieName.length);
    }
  }

  return null; // Return null if the cookie with the given name is not found.
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function saveUser(user) {
  let account = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    role: user.role,
    province: user.province ?? "",
    district: user.district ?? "",
    ward: user.ward ?? "",
    street: user.street ?? "",
    zip_code: user.zip_code ?? "",
    avatar:
      user.avatar ??
      `${process.env.VUE_APP_DOMAIN_URL}/storage/uploads/default.jpg`,
  };
  localStorage.setItem("user", JSON.stringify(account));
}

function getStatusOrder(status) {
  console.log(status);
  let rs = "";
  switch (parseInt(status)) {
    case 1:
      rs = '<span class="btn btn-primary btn-rounded">Chờ lấy hàng</span>';
      break;
    case 2:
      rs = '<span class="btn btn-info btn-rounded">Đang giao</span>';
      break;
    case 3:
      rs = '<span class="btn btn-dark btn-rounded">Chờ xác nhận hủy</span>';
      break;
    case 4:
      rs = '<span class="btn btn-danger btn-rounded">Đã hủy</span>';
      break;
    case 5:
      rs =
        '<span class="btn btn-success btn-rounded">Đã giao</span>';
      break;
    case 6:
      rs = '<span class="btn btn-warning btn-rounded">Đang trả hàng</span>';
      break;
    case 7:
      rs = '<span class="btn btn-success btn-rounded">Đã trả hàng</span>';
      break;
    default:
      rs = '<span class="btn btn-warning btn-rounded">Chờ xác nhận</span>';
      break;
  }

  return rs;
}

export {
  convertDateTime,
  deleteCookie,
  formatCash,
  getCookie,
  getStatusOrder,
  parseTree,
  saveUser,
  setCookie,
  showPrice,
};
