import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/categories`;

export default {
  getAllCategories() {
    return getAxios().get(`${baseUrl}/list`);
  },
  getDetailCategory(category_id) {
    return getAxios().get(`${baseUrl}/detail/${category_id}`);
  },
  create(category) {
    return getAxios().post(`${baseUrl}/create`, {
      name: category.name,
      parent_id: category.parent_id,
      description: category.description,
      active: category.active,
    });
  },
  remove(category_id) {
    return getAxios().delete(`${baseUrl}/delete`, {
      data: { id: category_id },
    });
  },
  edit(category) {
    return getAxios().put(`${baseUrl}/update`, {
      id: category.id,
      name: category.name,
      parent_id: category.parent_id,
      description: category.description,
      active: category.active,
    });
  },
};
