import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/stores/auth.store.js";

// Auth Routes
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// App Routes
import HomeView from '../views/HomeView.vue'
import MenuView from "@/views/MenuView.vue";
import CategoryView from "@/views/CategoryView.vue";
import ItemView from "@/views/ItemView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        layout: "guest"
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        layout: "guest"
      }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/menus',
      name: 'menus',
      component: MenuView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoryView
    },
    {
      path: '/items',
      name: 'items',
      component: ItemView
    },
  ]
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  if (to.name === "login" || to.name === "register") {
    if (authStore.user) {
      return "/";
    }
  } else if (!authStore.user) {
    return "/login";
  }
});

export default router;
