import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import { _import } from "../untils/untils";

export default new Router({
  routes: [
    {
      path: '/',
      name: '/tabs',
      component: _import('tabs/tabsPage'),
      redirect: '/tabs'
    },
    // tabs
    {
      path: '/tabs',
      name: 'tabs',
      component: _import('tabs/tabsPage'),
      redirect: '/tabs/indexPage',
      children:[
        // 首页
        {
          path: '/tabs/indexPage',
          name: 'indexPage',
          component: _import('index/indexPage')
        },
        // 我的
        {
          path: '/tabs/userPage',
          name: 'userPage',
          component: _import('user/userPage'),
          meta: {
            needLogin: true
          }
        },
      ]
    },
    // 登陆
    {
      path: '/login/loginPage',
      name: 'loginPage',
      component: _import('login/loginPage'),
    },
    // 注册
    {
      path: '/login/registerPage',
      name: 'registerPage',
      component: _import('login/registerPage'),
    },
    // 投注面板 足彩
    {
      path: '/bet/fbBetPage',
      name: 'fbBetPage',
      component: _import('bet/football/fbBetPage')
    },
    // 投注确认页
    {
      path: '/bet/pay/betSubmitPage',
      name: 'betSubmitPage',
      component: _import('bet/pay/betSubmitPage'),
      meta:{
        needLogin: true
      }
    }
  ]
})
