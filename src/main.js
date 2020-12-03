// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email, alpha_dash } from 'vee-validate/dist/rules';
import { localize } from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW';

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;
Vue.use(Loading);
Vue.use(VueAxios, axios);
Vue.filter('currency', currencyFilter);

axios.defaults.withCredentials = true;

Vue.component('Loading', Loading);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
// Activate the Arabic locale.
localize("zh_TW", zh_TW);

// vee-validate extend
extend('email', email);
extend('required', required);
extend('alpha_dash', alpha_dash);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
      const api = `${process.env.PATH}/api/user/check`;
      axios.post(api).then((response) => {
        if (response.data.success) {
          next();
        } else {
          next({path: '/login'});
        }
      });
  } else {
    next();
  }
})
