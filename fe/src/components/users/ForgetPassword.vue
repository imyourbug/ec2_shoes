<template>
  <div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Quên mật khẩu</h5>
        </div>
        <div class="modal-body login-block">
          <div class="form-login">
            <div class="md-float-material form-material">
              <div class="card-block">
                <div class="row">
                  <div class="col-md-12">
                    <h3 class="text-center heading">QUÊN MẬT KHẨU</h3>
                  </div>
                </div>
                <div class="row block-recover">
                  <div class="recover my-4" v-if="!isRecovered">
                    <input
                      class="form-control"
                      placeholder="Nhập email của bạn"
                      v-model="account.email"
                      @keyup.enter="confirm"
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
                    <div class="mt-4">
                      <button @click="confirm" class="btn-success btn">
                        Xác nhận
                      </button>
                    </div>
                    <br/>
                    <div class="btn-register" >
                Chưa có tài khoản?
                  <p data-target="#modalRegister"
                  data-toggle="modal"
                  data-dismiss="modal"
                  >Đăng ký</p>
                </div>
                <p class="text-inverse text-center">
                  Đã có tài khoản?
                  <div
                  class="btn-forget"
                  data-dismiss="modal"
                  data-target="#modalLogin"
                  data-toggle="modal"
                >
                Đăng nhập
                </div>
                </p>
                  </div>
                  <div class="recover my-4" v-else>
                    <p>
                      Mật khẩu đã được gửi về
                      <a
                        target="__blank"
                        href="https://mail.google.com/mail/u/0"
                        >{{ account.email }}</a
                      >
                      vui lòng kiểm tra email
                    </p>
                    Quay lại đăng nhập
                    <div @click="reset" data-target="#modalLogin" data-toggle="modal">Click</div>
                  </div>
                </div>
                <br />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  reactive,
  ref,
} from 'vue';

import { RepositoryFactory } from '@/api/repositories/RepositoryFactory';
import { useToasted } from '@hoppscotch/vue-toasted';
import { useVuelidate } from '@vuelidate/core';
import {
  email,
  helpers,
  required,
} from '@vuelidate/validators';

const toast = useToasted();
const authRepository = RepositoryFactory.get("auth");

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;

const account = reactive({
  email: "",
});
const isRecovered = ref(false);

// validate
const rules = {
  email: {
    required: helpers.withMessage("Không được để trống!", required),
    email: helpers.withMessage("Email không hợp lệ!", email),
  },
};

const v$ = useVuelidate(rules, account);

const confirm = () => {
  v$.value.$validate();
  if (!v$.value.$invalid) {
    authRepository.resetPassword(account.email.trim()).then((response) => {
      if (response.data.status === 0) {
        isRecovered.value = true;
      }
      if (response.data.status === 1) {
        toast.success(response.data.error.message, {
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
        console.log("Throw exception");
      }
    });
  }
};

const closeModal = (modal) => {
  $("#" + modal).hide();
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
  v$.value.$reset();
};

const reset = () => {
  isRecovered.value = false;
  account.email = '';
  closeModal('modalForgetPass')
}
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
