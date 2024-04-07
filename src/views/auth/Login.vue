<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
import {useAuthStore} from "@/stores/auth.store.js";

const user = ref({
  email: null,
  password: null
});

async function login() {
  const authStore = useAuthStore();
  await authStore.login(this.user.email, this.user.password);
}

</script>

<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth">
        <div class="row flex-grow">
          <div class="col-lg-4 mx-auto">
            <div class="col-md-12">
              <div class="alert alert-success">Creativity takes time!</div>
              <div class="alert alert-info">
                email: user1@user.com
                <br />
                password: 123123123
              </div>
            </div>
            <div class="auth-form-light text-left p-5">
              <h4>Hello! let's get started</h4>
              <form class="pt-3" @submit.prevent="login()">
                <div class="form-group">
                  <input type="email" class="form-control form-control-lg" id="email" placeholder="Email" v-model="user.email">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control form-control-lg" id="password" placeholder="Password" v-model="user.password">
                </div>
                <div class="mt-3">
                  <button type="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">Login</button>
                </div>
                <div class="text-center mt-4 font-weight-light">Don't have an account?
                  <router-link :to="{name: 'register'}" class="text-primary">Register</router-link>
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