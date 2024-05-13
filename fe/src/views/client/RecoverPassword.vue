<template>
  <div class="row block-recover">
    <div class="recover my-4" v-if="!isRecovered">
      <p>Nhập email của bạn</p>
      <input
        class="form-control"
        placeholder="Email đăng nhập"
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
        <button @click="confirm" class="btn-success btn">Xác nhận</button>
      </div>
    </div>
    <div class="recover my-4" v-else>
      <p>
        Mật khẩu đã được gửi về
        <a target="__blank" href="https://mail.google.com/mail/u/0">{{
          account.email
        }}</a>
        vui lòng kiểm tra email
      </p>
      Quay lại trang đăng nhập
      <router-link :to="{ name: 'login' }">Click</router-link>
    </div>
  </div>
</template>

<script setup>
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { ref, reactive } from "vue";

const authRepository = RepositoryFactory.get("auth");

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
      console.log(response);
      if (response.data.status === 0) {
        isRecovered.value = true;
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
.block-recover {
  display: flex;
  justify-content: center;
}
.recover {
  max-width: 400px;
}
.recovered {
  max-width: 600px;
}
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
</style>
