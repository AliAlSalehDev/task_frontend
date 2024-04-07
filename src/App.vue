<script setup>
import { RouterLink, RouterView,useRoute } from 'vue-router'

import Sidebar from "@/components/layout/Sidebar.vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";

const route = useRoute();
</script>

<template>

  <main v-if="route.meta.layout !== 'guest'">
    <div class="container-scroller">
      <!-- partial:partials/_navbar.html -->
      <Navbar />
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <!-- partial:partials/_sidebar.html -->
        <Sidebar />
        <!-- partial -->
        <div class="main-panel">
          <RouterView />
          <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html -->
          <Footer />
          <!-- partial -->
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </main>

  <main v-else>
    <RouterView />
  </main>

</template>

<style scoped>
</style>
