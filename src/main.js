import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import {router} from '@/router/index'
import atUser from '@/components/atUser';
import dateUtils from '@/utils/dateUtils';
import userInfo from '@/utils/userInfo';

Vue.prototype.$date = dateUtils;
Vue.prototype.userInfo = userInfo;

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component("at-user",atUser);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
