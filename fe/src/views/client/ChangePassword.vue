<template>
  <section class="login-block">
    <div class="form-login">
      <div class="md-float-material form-material">
        <div class="card-block">
          <div class="row">
            <div class="col-md-12">
              <h3 class="text-center heading">ĐỔI MẬT KHẨU</h3>
            </div>
          </div>
          <div class="form-group form-primary">
            <input
              readonly
              type="text"
              v-model="account.email"
              class="form-control"
              placeholder="Email"
            />
          </div>

          <div class="form-group form-primary">
            <input
              type="password"
              v-model="account.password"
              class="form-control"
              placeholder="Mật khẩu cũ"
            />
            <div :class="{ error: v$.password.$error.length }">
              <div
                class="input-errors"
                v-for="error of v$.password.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="form-group form-primary">
            <input
              type="password"
              v-model="account.new_password"
              class="form-control"
              placeholder="Mật khẩu mới"
            />
            <div :class="{ error: v$.new_password.$error.length }">
              <div
                class="input-errors"
                v-for="error of v$.new_password.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="form-group form-primary">
            <input
              type="password"
              class="form-control"
              v-model="account.re_new_password"
              placeholder="Nhập lại mật khẩu mới"
            />
            <div :class="{ error: v$.re_new_password.$error.length }">
              <div
                class="input-errors"
                v-for="error of v$.re_new_password.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 block-btn">
              <input
                class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"
                readonly
                value="Xác nhận"
                @click="changePassword"
              />
              <!--  <button type="button" class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"><i class="fa fa-lock"></i> Signup Now </button> -->
            </div>
          </div>

          <div class="or-container">
            <div class="line-separator"></div>
            <div class="or-label">or</div>
            <div class="line-separator"></div>
          </div>
          <GoogleLogin class="GoogleLogin" />
          <br />
          <p class="text-inverse text-center">
            Trang chủ
            <router-link :to="{ name: 'home' }">Quay lại</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import {
  email,
  helpers,
  required,
  minLength,
  sameAs,
  not,
} from "@vuelidate/validators";

const router = useRouter();
const authRepository = RepositoryFactory.get("auth");

const account = reactive({
  email: JSON.parse(localStorage.getItem("user")).email ?? "",
  password: "",
  new_password: "",
  re_new_password: "",
});

// validate
// confirm
const space = helpers.regex(/[^\s]/);

const rules = {
  password: {
    required: helpers.withMessage("Không được để trống!", required),
  },
  new_password: {
    required: helpers.withMessage("Không được để trống!", required),
    space: helpers.withMessage("Mật khẩu không được chứa dấu cách!", space),
    minLength: helpers.withMessage(
      "Mật khẩu tối thiểu gồm 8 ký tự!",
      minLength(8)
    ),
    // sameAs: helpers.withMessage(
    //   "Mật khẩu mới không được trùng với mật khẩu cũ!",
    //   not(sameAs(account.password))
    // ),
  },
  re_new_password: {
    required: helpers.withMessage("Không được để trống!", required),
    space: helpers.withMessage("Mật khẩu không được chứa dấu cách!", space),
    minLength: helpers.withMessage(
      "Mật khẩu tối thiểu gồm 8 ký tự!",
      minLength(8)
    ),
    // sameAs: helpers.withMessage(
    //   "Mật khẩu nhập lại phải trùng khớp!",
    //   sameAs(account.new_password)
    // ),
  },
};

const v$ = useVuelidate(rules, account);

const changePassword = () => {
  v$.value.$validate();
  if (v$.value.$invalid) {
    alert("Vui lòng điền đầy đủ thông tin");
  } else {
    authRepository.changePassword(account).then((response) => {
      if (response.data.status === 0) {
        console.log("Đổi mật khẩu thành công");
        router.push({
          name: "home",
        });
      }
      if (response.data.status === 1) {
        alert(response.data.error.message);
      }
      if (response.data.status !== 1 && response.data.status !== 0) {
        alert("Throw exception");
      }
    });
  }
};
</script>

<style scoped>
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
.form-login {
  width: 25%;
}
.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1),
    0 11px 6px -7px rgba(43, 43, 43, 0.1);
  box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1),
    0 11px 6px -7px rgba(43, 43, 43, 0.1);
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #fff;
}

.card .card-block {
  padding: 1.25rem;
}

.f-80 {
  font-size: 80px;
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

.btn-google {
  color: #545454;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 1px #ddd;
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
</style>
