<template>
  <GoogleLogin :callback="logInByGoogle" class="GoogleLogin" />
</template>

<script setup>
import {
  defineProps,
  inject,
} from 'vue';

import jwt_decode from 'jwt-decode';
import { useRouter } from 'vue-router';

import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';
import {
  saveUser,
  setCookie,
} from '@/helpers/helper.js';

const emitter = inject("emitter");
const router = useRouter();

const authRepository = RepositoryFactory.get("auth");

const props = defineProps({
  closeModal: Function,
  toast: Object,
  duration_time: String,
})

const logInByGoogle = (response) => {
  try {
    const googleUser = jwt_decode(response.credential);
    // save user login
    if (googleUser) {
      let account = {
        id: googleUser.sub,
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.picture,
        type: "GOOGLE",
      };
      authRepository.socialLogin(account).then((response) => {
        if (response.data.status === 0) {
          setCookie("access_token", response.data.access_token, 1);
          let user = response.data.user.user;
          saveUser(user);
          props.toast.success("Đăng nhập thành công", {
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
          props.closeModal("modalLogin");
          // reload user
          emitter.emit("reloadHeader");
          emitter.emit("reloadProductDetail");
        }
        if (response.data.status === 1) {
          props.toast.error(response.data.error.message, {
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
  } catch (e) {
    console.log(e);
  }
};
</script>
<style scoped></style>
