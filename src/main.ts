import { createApp } from 'vue';
// import { createPinia } from 'pinia';
// import { createStore } from 'vuex'
import store from './stores';

import App from './App.vue';
import router from './router';

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/scss/bootstrap.scss';
import Datepicker from '@vuepic/vue-datepicker';
// import './assets/main.css';

const app = createApp(App);
app.component('Datepicker', Datepicker);
// app.use(createPinia());
app.use(store);
app.use(router);

app.use(BootstrapVue3);

app.mount('#app');
