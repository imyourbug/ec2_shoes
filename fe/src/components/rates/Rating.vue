<template>
  <div class="out-texthead">
    <div class="text-head">
      <i class="far fa-comment-dots"></i>&ensp;ĐÁNH GIÁ SẢN PHẨM
    </div>
  </div>
  <div class="block-comment mt-2 col-6">
    <div class="head-comment">
      <div class="txt-cmt">
        Viết bình luận ..... <i class="fas fa-pencil-alt"></i>
      </div>
    </div>
    <div class="content-comment mt-2">
      <img
        class="avatar"
        :src="
          user == null ? `${domain}/storage/uploads/default.jpg` : user.avatar
        "
      />&emsp;
      <input
        class="form-control"
        placeholder="Nhập bình luận của bạn tại đây"
        v-model="comment.content"
        @keyup.enter="addComment"
      />
      <br />
    </div>
    <div class="row">
      <div class="col-md-12">
        <br />
        <div class="stars">
          <i
            v-for="index in comment.level_star"
            class="fa-solid fa-star"
            @click="setLevelStar(index)"
          ></i>
          <i
            v-for="index in 5 - comment.level_star"
            class="fa-regular fa-star"
            @click="setLevelStar(comment.level_star + index)"
          ></i>
        </div>
      </div>
    </div>
    <div style="text-align: right">
      <button @click="addComment" class="btn-send my-2">Gửi</button>
    </div>
  </div>
  <div v-if="comments && comments.length > 0">
    <Comment
      v-for="com in comments"
      :key="com.id"
      :comment="com"
      :showRepComment="showRepComment"
      :showEditComment="showEditComment"
      :domain="domain"
      :duration_time="duration_time"
      :user="user"
    />
  </div>
</template>

<script setup>
import { defineProps, inject, onMounted, reactive, ref, watch } from "vue";

import { useRouter } from "vue-router";

import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import Comment from "@/components/comments/Comment.vue";
import { useToasted } from "@hoppscotch/vue-toasted";

const toast = useToasted();
const router = useRouter();
const commentRepository = RepositoryFactory.get("comment");
const emitter = inject("emitter");

const props = defineProps({
  user: Object,
  comments: Array,
  product_id: Number,
  showEditComment: Array,
});

const domain = process.env.VUE_APP_DOMAIN_URL;
const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;
const product_id = parseInt(router.currentRoute.value.params.id);
const showRepComment = ref(-1);

const comment = reactive({
  user_id: "",
  product_id: product_id,
  content: "",
  reply_id: 0,
  level_star: 5,
});

const reset = () => {
  comment.content = "";
  comment.reply_id = 0;
  comment.level_star = 5;
};

// add comment
const addComment = () => {
  if (!comment.user_id) {
    toast.error("Bạn cần đăng nhập để bình luận", {
      duration: duration_time,
      action: [
        {
          text: `OK`,
          onClick: (_, toastObject) => {
            toastObject.goAway(0);
          },
        },
      ],
    });
    return;
  }
  if (comment.content.trim()) {
    $(".btn-send").prop("disabled", true);
    commentRepository.createComment(comment).then((response) => {
      if (response.data.status === 0) {
        $(".btn-send").prop("disabled", false);
        reset();
        emitter.emit("reloadProductDetail");
        toast.success("Bình luận thành công", {
          duration: duration_time,
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
      if (response.data.status === 1) {
        $(".btn-send").prop("disabled", false);
        toast.error(response.data.error.message, {
          duration: duration_time,
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
        $(".btn-send").prop("disabled", false);
        console.log(response.data);
      }
    });
  }
};

const setLevelStar = (level) => {
  comment.level_star = level;
};

watch(
  () => props.user,
  (newValue, oldValue) => {
    comment.user_id = newValue.id;
  }
);
</script>

<style scoped>
body {
  background-color: #eee;
}
.out-texthead {
  border-bottom: 1px solid #2e3094;
}

.out-texthead .text-head {
  font-size: 20px;
  padding: 5px 0px 5px 10px;
  background-color: #2e3094;
  width: max-content;
  color: white;
}

.content-comment {
  display: flex;
  justify-content: center;
}

.btn-send {
  border: none;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  color: white;
  background-color: #2e3094;
}

.btn-send:hover {
  background-color: #ed1a29;
  outline: 1px solid #ed1a29;
}
/*  */

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.out-texthead {
  border-bottom: 1px solid #2e3094;
}
.out-texthead .text-head {
  font-size: 20px;
  padding: 5px 0px 5px 10px;
  background-color: #2e3094;
  width: 30%;
  color: white;
}
.content-comment textarea {
  padding: 10px;
}
.btn-send {
  border: none;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  color: white;
  background-color: #2e3094;
}
.btn-send:hover {
  background-color: #ed1a29;
  outline: 1px solid #ed1a29;
}
div.stars {
  width: max-content;

  display: inline-block;
}
.fa-star {
  color: orange;
  margin-right: 10px;
}
@media (max-width: 620px) {
  .text-head {
    width: 100% !important;
  }
}
@media (max-width: 440px) {
  .txt-cmt {
    display: none;
  }
}
</style>
