<template>
  <div class="row block-about" id="lienhe">
    <div class="about-left col-4">
      <p class="text-head">Thông tin liên hệ</p>
      <hr />
      <div class="list-infor">
        <i class="fas fa-map-marker-alt"></i>&ensp;Địa chỉ: Quốc Oai, Hà Tây<br />
        <i class="fas fa-envelope"></i>&ensp;Email:
        duongvankhai2022001@gmail.com<br />
        <i class="fas fa-phone"></i>&ensp;Số điện thoại: 0368822642<br />
        <i class="fas fa-globe"></i>&ensp;Website: khaikheoandfriends.com
      </div>
    </div>
    <div class="about-mid col-4">
      <p class="text-head">Liên kết hữu ích</p>
      <hr />
      <ul>
        <li>
          <a href="/danh-muc/"></a>
        </li>
      </ul>
    </div>
    <div class="about-right col-4">
      <p class="text-head">Kết nối với chúng tôi</p>
      <hr />
      <!--<div class="list-mxh">
        <a href="https://www.facebook.com/duongvan.khai.547"
          ><i class="fab fa-facebook"></i
        ></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
      </div> -->
      <ListSocial />
    </div>
  </div>
  <div class="block-end">
    <div class="end-text">© 2021 Khải Khéo and Friends</div>
  </div>
</template>

<script setup>
import ListSocial from "@/components/footers/ListSocial.vue";
</script>

<style scoped>
a {
  text-decoration: none;
}
.block-about {
  color: white;
  background-image: linear-gradient(to right, rgb(6, 46, 122), rgb(51, 1, 116));
  padding: 80px 155px;
  text-align: left;
}
div .text-head {
  font-size: 22px;
  text-align: center;
}
.list-mxh {
  text-align: center;
}
.list-mxh .fab {
  border-radius: 50%;
  font-size: 40px;
  padding: 10px;
  color: white;
}
.list-mxh .fab:hover {
  transition: 0.6s;
  box-shadow: 1px 1px 1px 1px white;
}
.about-mid ul {
  padding-left: 18px;
}
.block-end {
  background-color: #393a44;
}
.block-end .end-text {
  text-align: center;
  color: rgb(150, 140, 140);
  padding: 5px 0px 5px 0px;
}

@media (max-width: 620px) {
  .about-left, .about-mid, .text-head {
    display: none;
  }
  .block-about {
    text-align: center;
  }
}
</style>
