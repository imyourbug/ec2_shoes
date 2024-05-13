import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@hoppscotch/vue-toasted/style.css';

import { createApp } from 'vue';

import mitt from 'mitt';
import * as uiv from 'uiv';
import vue3GoogleLogin from 'vue3-google-login';
import Select2 from 'vue3-select2-component';
import Vue3Tab from 'vue3-tab';

import store from '@/store';
import Toasted from '@hoppscotch/vue-toasted';

import App from './App.vue';
import router from './routes';

const emitter = mitt();
const app = createApp(App);
const gauthClientId = process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID;

app.provide("emitter", emitter);
app.use(Toasted); // You can pass options as a second parameter
app.use(store);
app.use(router);
app.use(uiv);
app.use(Vue3Tab);
app.use(vue3GoogleLogin, {
  clientId: gauthClientId,
});

app.component("Select2", Select2);

app.mount("#app");
