import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/comments`;

export default {
  getAllComments() {
    return getAxios().get(`${baseUrl}/list`);
  },
  createComment(comment) {
    return getAxios().post(`${baseUrl}/create`, {
      user_id: comment.user_id,
      product_id: comment.product_id,
      reply_id: comment.reply_id,
      content: comment.content,
      level_star: comment.level_star,
    });
  },
  updateContentComment(comment_id, content) {
    return getAxios().put(`${baseUrl}/update`, {
      id: comment_id,
      content: content,
    });
  },
  deleteComment(comment_id) {
    return getAxios().delete(`${baseUrl}/delete`, {
      data: {
        id: comment_id,
      },
    });
  },
};
