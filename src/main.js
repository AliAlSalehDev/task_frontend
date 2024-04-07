// import './assets/main.css'
import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css'
import './assets/css/custom.css'

import './assets/vendors/js/vendor.bundle.base.js'
// import './assets/vendors/chart.js/Chart.min.js'
// import './assets/js/jquery.cookie.js'
// import './assets/js/off-canvas.js'
// import './assets/js/hoverable-collapse.js'
// import './assets/js/misc.js'
// import './assets/js/dashboard.js'
// import './assets/js/todolist.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
    console.log(err)
}

app.use(createPinia())
app.use(router)

app.use(VueSweetalert2);

app.mount('#app')
