<script setup>
</script>

<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item" :class="$route.path === '/' ? 'active' : '' ">
        <router-link :to="{name: 'home'}" class="nav-link">
          <span class="menu-title">Home</span>
          <i class="mdi mdi-home menu-icon"></i>
        </router-link>
      </li>
      <li class="nav-item" :class="$route.path === '/menus' ? 'active' : '' ">
        <router-link :to="{name: 'menus'}" class="nav-link">
          <span class="menu-title">Menus</span>
          <i class="mdi mdi-menu menu-icon"></i>
        </router-link>
      </li>
      <li class="nav-item" :class="$route.path === '/categories' ? 'active' : '' ">
        <router-link :to="{name: 'categories'}" class="nav-link">
          <span class="menu-title">Categories</span>
          <i class="mdi mdi-buffer menu-icon"></i>
        </router-link>
      </li>
      <li class="nav-item" :class="$route.path === '/items' ? 'active' : '' ">
        <router-link :to="{name: 'items'}" class="nav-link">
          <span class="menu-title">Items</span>
          <i class="mdi mdi-food-fork-drink menu-icon"></i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>