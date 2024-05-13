<template>
  <div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Đăng nhập tài khoản</h5>
        </div>
        <div class="modal-body login-block">
          <div class="form-login">
            <div class="md-float-material form-material">
              <div class="card-block">
                <div class="row">
                  <div class="col-md-12">
                    <h3 class="text-center heading">ĐĂNG NHẬP</h3>
                  </div>
                </div>
                <div class="form-group form-primary">
                  <input
                    @keyup.enter="handleLogin"
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    v-model="account.email"
                  />
                  <div :class="{ error: v$.email.$errors.length }">
                    <div
                      class="input-errors"
                      v-for="error of v$.email.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </div>
                </div>

                <div class="form-group form-primary">
                  <input
                    @keyup.enter="handleLogin"
                    type="password"
                    class="form-control"
                    placeholder="Mật khẩu"
                    v-model="account.password"
                  />
                  <div :class="{ error: v$.password.$errors.length }">
                    <div
                      class="input-errors"
                      v-for="error of v$.password.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 block-btn">
                    <input
                      type="submit"
                      class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"
                      name="submit"
                      value="Đăng nhập"
                      @click="handleLogin"
                    />
                  </div>
                </div>

                <div class="or-container">
                  <div class="line-separator"></div>
                  <div class="or-label">or</div>
                  <div class="line-separator"></div>
                </div>
                <GoogleButton
                  class="GoogleLogin"
                  :close-modal="closeModal"
                  :toast="toast"
                  :duration_time="duration_time"
                />
                <br />
                <br />
                <FacebookSignin
                  :appId="appIdFB"
                  @success="onSignInSuccessFacebook"
                  @error="onSignInErrorFacebook"
                >
                  <span class="btn-primary btn-fb"
                    ><i class="fa-brands fa-facebook"></i> Đăng nhập
                    Facebook</span
                  >
                </FacebookSignin>
                <br />
                <!-- <router-link>Đăng ký</router-link> -->
                <div class="btn-register">
                  Chưa có tài khoản?
                  <p
                    data-target="#modalRegister"
                    data-toggle="modal"
                    data-dismiss="modal"
                  >
                    Đăng ký
                  </p>
                </div>
                <p class="text-inverse text-center">Quên mật khẩu?</p>
                <div
                  class="btn-forget"
                  data-dismiss="modal"
                  data-target="#modalForgetPass"
                  data-toggle="modal"
                >
                  Nhấn vào đây
                </div>
                <!-- <router-link :to="{ name: 'recover-password' }"
                    >Nhấn vào đây</router-link> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, reactive } from "vue";

import { useRouter } from "vue-router";
import { FacebookSignin } from "vue3-google-facebook-signin";

import { RepositoryFactory } from "@/api/repositories/RepositoryFactory";
import GoogleButton from "@/components/GoogleLogin.vue";
import { saveUser, setCookie } from "@/helpers/helper.js";
import { useToasted } from "@hoppscotch/vue-toasted";
import { useVuelidate } from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";

const toast = useToasted();
const router = useRouter();
const emitter = inject("emitter");
const authRepository = RepositoryFactory.get("auth");

const appIdFB = process.env.VUE_APP_FB_ID;

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;
const account = reactive({
  email: "",
  password: "",
});

// validate
const rules = {
  email: {
    required: helpers.withMessage("Không được để trống!", required),
    email: helpers.withMessage("Email không hợp lệ!", email),
  },
  password: {
    required: helpers.withMessage("Không được để trống!", required),
  },
};

const v$ = useVuelidate(rules, account);

const onSignInErrorFacebook = (error) => {
  console.log(error);
};

const reset = () => {
  account.email = "";
  account.password = "";
};

const closeModal = (modal) => {
  $("#" + modal).hide();
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
  v$.value.$reset();
  reset();
};

const onSignInSuccessFacebook = (res) => {
  authRepository
    .getInforByAccessTokenFB(res.authResponse.accessToken)
    .then((response) => {
      let user = response.data;
      let account = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.picture.data.url,
        type: "FACEBOOK",
      };
      authRepository.socialLogin(account).then((response) => {
        if (response.data.status === 0) {
          setCookie("access_token", response.data.access_token, 1);
          let user = response.data.user.user;
          saveUser(user);
          emitter.emit("reloadHeader");
          emitter.emit("reloadProductDetail");
          toast.success("Đăng nhập thành công", {
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
          closeModal("modalLogin");
        }
        if (response.data.status === 1) {
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
          console.log(response.data);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleLogin = () => {
  v$.value.$validate();
  if (v$.value.$invalid) {
    toast.error("Vui lòng điền đầy đủ thông tin", {
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
  } else {
    try {
      authRepository.login(account).then((response) => {
        if (response.data.status === 0) {
          let user = response.data.user;
          setCookie("access_token", response.data.access_token, 1);
          saveUser(user);
          // Change name
          emitter.emit("reloadHeader");
          emitter.emit("reloadProductDetail");
          toast.success("Đăng nhập thành công", {
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
          closeModal("modalLogin");
        }
        if (response.data.status === 1) {
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
        if (response.data.status !== 1 && response.data.status !== 0) {
          console.log(response.date);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
<style scoped>
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}

body {
  background-color: #f2f7fb;
}

.login-block {
  margin: 30px auto;
  display: flex;
  justify-content: center;
}

.login-block .auth-box {
  margin: 20px auto 0;
  max-width: 450px !important;
}
.form-group {
  margin-bottom: 1.25em;
}

.form-material .form-control {
  display: inline-block;
  height: 43px;
  width: 100%;
  border: none;
  border-radius: 0;
  font-size: 16px;
  font-weight: 400;
  padding: 9px;
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 1px solid #ccc;
}
.btn-md {
  padding: 10px 16px;
  font-size: 15px;
  line-height: 23px;
}

.btn-primary {
  background-color: #4099ff;
  border-color: #4099ff;
  color: #fff;
  cursor: pointer;
  -webkit-transition: all ease-in 0.3s;
  transition: all ease-in 0.3s;
}

.btn {
  border-radius: 2px;
  text-transform: capitalize;
  font-size: 15px;
  padding: 10px 19px;
  cursor: pointer;
  /* transition: all 0.3s ease; */
}

.m-b-20 {
  margin-bottom: 20px;
}

.btn-md {
  padding: 10px 16px;
  font-size: 15px;
  line-height: 23px;
}

.heading {
  font-size: 21px;
}

#infoMessage p {
  color: red !important;
}

.or-container {
  align-items: center;
  color: #ccc;
  display: flex;
  margin: 25px 0;
}

.line-separator {
  background-color: #ccc;
  flex-grow: 5;
  height: 1px;
}

.or-label {
  flex-grow: 1;
  margin: 0 15px;
  text-align: center;
}

.block-btn {
  text-align: center;
}

.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}

.GoogleLogin {
  text-align: center;
}

.btn-fb {
  padding: 10px;
}
.card-block {
  text-align: center;
}
</style>
