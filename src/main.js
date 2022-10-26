import Vue from 'vue'
import App from './App'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/main.scss'
import moment from 'moment';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { locale });
moment().format();

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')