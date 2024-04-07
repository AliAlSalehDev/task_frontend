<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
import {useAuthStore} from "@/stores/auth.store.js";

const user = ref({
  name: null,
  email: null,
  password: null,
  password_confirmation: null
});

async function register() {
  const authStore = useAuthStore();
  await authStore.register(this.user);
}
</script>

<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth">
        <div class="row flex-grow">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left p-5">
              <h4>Hello! let's get started</h4>
              <form class="pt-3" @submit.prevent="register()">
                <div class="form-group">
                  <input type="text" class="form-control form-control-lg" id="name" placeholder="Full Name" v-model="user.name">
                </div>
                <div class="form-group">
                  <input type="email" class="form-control form-control-lg" id="email" placeholder="Email" v-model="user.email">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control form-control-lg" id="password" placeholder="Password" v-model="user.password">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control form-control-lg" id="password_confirmation" placeholder="Password Confirmation" v-model="user.password_confirmation">
                </div>
                <div class="mt-3">
                  <button type="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">Register</button>
                </div>
                <div class="text-center mt-4 font-weight-light">Already have an account?
                  <router-link :to="{name: 'login'}" class="text-primary">Login</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<style scoped>

</style>