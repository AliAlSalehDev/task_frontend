import { defineStore } from "pinia";
import router from "@/router";
import {sender} from "@/utils/axios.js";
import { useAlertStore } from "../stores/alerts.store";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("auth")),
    returnUrl: null,
  }),
  actions: {
    // Register Action
    async register(data) {
      const alertStore = useAlertStore();
      try {
        const user = await sender.post(`/register`, data);

        // update pinia state
        this.user = user.data;

        this.user.user.image_path = user.data.image_path;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("auth", JSON.stringify(user.data));
        await router.push(this.returnUrl || "/");

      } catch (err) {
        console.log(err)
      }
    },
    // Login Action
    async login(email, password) {
      try {
        const response = await sender.post(`/login`, {
          email,
          password,
        });

        this.user = response.data;

        localStorage.setItem("auth", JSON.stringify(response.data));

        // redirect to previous url or default to home page
        await router.push(this.returnUrl || "/");
      } catch (error) {
        console.log(error)
      }
    },
    // Logout Action
    logout() {
      this.user = null;
      localStorage.removeItem("auth");
      router.push("/login");
    }
  },
});
