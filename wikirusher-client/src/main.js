import Vue from 'vue'
import App from './App.vue'
import router from './router'



import VueFlashMessage from 'vue-flash-message';
require('vue-flash-message/dist/vue-flash-message.min.css');
Vue.use(VueFlashMessage);




Vue.config.productionTip = false

const root = new Vue({
  render: (h) => h(App),
  router
}).$mount()

document.body.appendChild(root.$el)

