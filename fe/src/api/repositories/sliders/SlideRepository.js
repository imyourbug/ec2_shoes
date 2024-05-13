import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/slides`;

export default {
  getAllSlides() {
    return getAxios().get(`${baseUrl}/list`);
  },
  create(slide) {
    return getAxios().post(`${baseUrl}/create`, {
      image: slide.image,
      sort_by: slide.sort_by,
      active: slide.active,
    });
  },
  remove(slide_id) {
    return getAxios().delete(`${baseUrl}/delete`, {
      data: { id: slide_id },
    });
  },
  edit(slide) {
    return getAxios().put(`${baseUrl}/update`, {
      id: slide.id,
      image: slide.image,
      sort_by: slide.sort_by,
      active: slide.active,
    });
  },
};
