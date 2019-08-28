// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

// 引入 app 公共 css
import './assets/scss/app.scss';

// 导入api接口  将api挂载到vue的原型上
import api from './request/api'
Vue.prototype.$api = api;

import {store} from "./untils/store";

Vue.prototype.$store = store;

// 页面路由跳转（前进） 设置动画
Vue.prototype.$navPush = function(path,query) {
  this.$store.commit("setTransition", "turn-on");
  this.$router.push({path: path, query:query});
};

router.beforeEach((to,from,next)=>{
  if(to.meta.needLogin){
    let token = localStorage.getItem('token');
    if(!token){
      Vue.prototype.$store.commit("setTransition", "turn-on");
      router.push({path:'/login/loginPage',query:{path:to.path}})
      // next();
    }else{
      next();
    }
  }else{
    next();
  }
  if(from.meta.savaPos){
    let top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    localStorage.setItem(from.name,top);
  }
});

router.afterEach((to,from,next) =>{
  let pos = localStorage.getItem(to.name);
  if(pos){
    setTimeout(()=>{
      let box = document.getElementById('content');
      if(box){
        box.scrollTop = pos;
      }
    },10)
  }
});


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
