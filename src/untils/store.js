import Vue from 'vue'
import vuex from 'vuex';

Vue.use(vuex);
//添加vuex 状态树 设置动画
const store =  new vuex.Store({//store对象
  state: {
    states: 'turn-on', // 场景切换方向
    token: localStorage.getItem('token'),         // token
    orderList: localStorage.getItem('orderList')?JSON.parse(localStorage.getItem('orderList')):'',    // 投注内容
  },
  mutations: {
    setTransition(state, states) {
      state.states = states
    },
    setToken(state,token){
      state.token = token;
      localStorage.setItem('token',token);
    },
    removeToken(state){
      state.token = '';
      localStorage.removeItem('token');
    },
    setOrder(state,orderList){
      state.orderList = orderList;
      localStorage.setItem('orderList',JSON.stringify(orderList));
    }
  }
});

export {
  store
}

