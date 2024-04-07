import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: {
            alert: [],
            type: null,
            success: false
        }
    }),
    actions: {
        succeed(message) {
            this.alert = { alert: message, type: 'alert-success' };
            this.success = true
        },
        error(message) {
            this.alert = { alert: message, type: 'alert-danger' };
            this.success = false
        },
        clear() {
            this.alert = [];
        }
    }
});