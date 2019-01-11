import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import css
import './assets/css/k-loading.css';
import './styles.css';
import '@/icons';// icon
// router sync
import {sync} from 'vuex-router-sync';

sync(store, router);
Vue.use(iView);

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
  store,
  components: {
  }
}).$mount('#app');
