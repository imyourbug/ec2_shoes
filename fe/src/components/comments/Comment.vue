<template>
  <div class="mt-2">
    <div class="row comment">
      <div class="col-1 user-img mt-2">
        <img
          :src="
            comment.user.avatar ??
            'http://localhost:8000/storage/uploads/default.jpg'
          "
        />
      </div>
      <div class="col-6 infor-comment mt-1">
        <div class="name-user">
          <a href="#">{{ comment.user.name }}</a>
          <br /><i
            v-for="index in comment.level_star"
            class="fa-solid fa-star"
          ></i>
          <i
            v-for="index in 5 - comment.level_star"
            class="fa-regular fa-star"
          ></i>
        </div>
        <div class="line-comment" v-if="showEditComment.includes(comment.id)">
          <input
            class="form-control"
            v-model="comment.content"
            @keyup.enter="editComment(comment.id, comment.content)"
          />
        </div>
        <div class="line-comment" v-else>{{ comment.content }}</div>
        <a class="like-comment"
          ><small><i class="fa-regular fa-thumbs-up"></i> Like</small> </a
        >&ensp;
        <!-- <a class="reply-comment" @click="showReply(comment.id)"
          ><small> &bull; Phản hồi</small>
        </a>
        &ensp; -->
        <a
          class="change-comment"
          @click="showEdit(comment.id)"
          v-if="comment.user.id === (user == null ? '' : user.id)"
          ><small> &bull; Sửa</small>
        </a>
        &ensp;

        <a
          class="delete-comment"
          @click="deleteComment(comment.id)"
          v-if="comment.user.id === (user == null ? '' : user.id)"
          ><small> &bull; Xóa</small>
        </a>
      </div>
    </div>
    <div class="row block-edit mt-1" v-if="showRepComment === comment.id">
      <input
        class="form-control"
        placeholder="Trả lời"
        v-model="reply_content"
        @keyup.enter="repComment(comment, reply_content)"
      />
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  defineProps,
  inject,
  onUnmounted,
  ref,
} from 'vue';

import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';
import { useToasted } from '@hoppscotch/vue-toasted';

const toast = useToasted();
const commentRepository = RepositoryFactory.get("comment");
const emitter = inject("emitter");

const reply_content = ref("");

const props = defineProps({
  comment: Object,
  user: Object,
  showEditComment: Array,
  showRepComment: Number,
  domain: String,
  duration_time: String,
});

const showEdit = (comment_id) => {
  emitter.emit("showEdit", comment_id);
};

const showReply = (comment_id) => {
  reply_content.value = "";
  emitter.emit("showReply", comment_id);
};

const editComment = (comment_id, new_content) => {
  if (new_content.trim()) {
    commentRepository
      .updateContentComment(comment_id, new_content)
      .then((response) => {
        if (response.data.status === 0) {
          toast.success("Chỉnh sửa bình luận thành công", {
            duration: props.duration_time,
            action: [
              {
                text: `OK`,
                onClick: (_, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            ],
          });
          emitter.emit("reloadProductDetail");
        }
        if (response.data.status === 1) {
          toast.error(response.data.error.message, {
            duration: props.duration_time,
            action: [
              {
                text: `OK`,
                onClick: (_, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            ],
          });
        }
        if (response.data.status !== 0 && response.data.status !== 1) {
          console.log(response.data);
        }
      });
  }
};

const repComment = (com) => {
  if (!props.comment.user_id) {
    alert("Bạn cần đăng nhập để bình luận");
  } else {
    if (reply_content.value.trim()) {
      let rep_comment = {
        user_id: props.comment.user_id,
        product_id: com.product_id,
        reply_id: com.id,
        content: reply_content.value,
      };
      commentRepository.createComment(rep_comment).then((response) => {
        if (response.data.status === 0) {
          toast.success("Phản hồi thành công", {
            duration: props.duration_time,
            action: [
              {
                text: `OK`,
                onClick: (_, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            ],
          });
          emitter.emit("reloadProductDetail");
        }
        if (response.data.status === 1) {
          toast.error(response.data.error.message, {
            duration: props.duration_time,
            action: [
              {
                text: `OK`,
                onClick: (_, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            ],
          });
        }
        if (response.data.status !== 0 && response.data.status !== 1) {
          console.log(response.data);
        }
      });
    }
  }
};

// delete comment
const deleteComment = (comment_id) => {
  if (confirm("Bạn có muốn xóa bình luận này không?")) {
    commentRepository.deleteComment(comment_id).then((response) => {
      if (response.data.status === 0) {
        toast.success("Xóa bình luận thành công", {
          duration: props.duration_time,
          action: [
            {
              text: `OK`,
              onClick: (_, toastObject) => {
                toastObject.goAway(0);
              },
            },
          ],
        });
        emitter.emit("reloadProductDetail");
      }
      if (response.data.status === 1) {
        toast.error(response.data.error.message, {
          duration: props.duration_time,
          action: [
            {
              text: `OK`,
              onClick: (_, toastObject) => {
                toastObject.goAway(0);
              },
            },
          ],
        });
      }
      if (response.data.status !== 0 && response.data.status !== 1) {
        console.log(response.data);
      }
    });
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
/* block-comment */
.block-edit {
  margin-left: 150px;
  width: 50%;
}
.like-comment:hover,
.change-comment:hover,
.reply-comment:hover,
.delete-comment:hover,
label.radio {
  cursor: pointer;
}

/* .show-commnet */
.comment {
  border-top: 1px solid rgb(199, 191, 191);
}
.user-img img {
  border-radius: 50%;
}
.comment {
  display: flex;
}
.user-img img {
  width: 60px;
  height: 60px;
}
.line-comment {
  font-weight: bold;
}
.delete-comment {
  margin-top: 10px;
  color: rgb(39, 133, 209);
  background-color: transparent;
}
.delete-comment:hover {
  color: #ed1a29;
}
.show-child-comment {
  cursor: pointer;
  color: #0084fe;
  font-size: 14px;
}
.show-child-comment i {
  color: rgb(39, 36, 36);
}

div.stars {
  width: max-content;

  display: inline-block;
}
input.star {
  display: none;
}
label.star {
  float: right;
  padding: 10px;
  color: #4a148c;
  transition: all 0.2s;
}

input.star:checked ~ label.star:before {
  content: "\f005";

  color: #fd4;

  transition: all 0.25s;
}

input.star-5:checked ~ label.star:before {
  color: #fe7;

  text-shadow: 0 0 20px #952;
}

input.star-1:checked ~ label.star:before {
  color: #f62;
}

label.star:hover {
  transform: rotate(-15deg) scale(1.3);
}

label.star:before {
  content: "\f006";

  font-family: FontAwesome;
}
.fa-star {
  color: orange;
}

</style>
