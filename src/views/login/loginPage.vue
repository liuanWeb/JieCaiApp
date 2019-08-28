<template>
  <div class="loginPage">
    <mHeader title="登 录"></mHeader>
    <div class="content">
      <div class="loginBox">
        <div class="logo mImgBox">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565953000066&di=4bccf54f9a6c20e28f60214b6f76928c&imgtype=0&src=http%3A%2F%2Frs.sfacg.com%2Fweb%2Fnovel%2Fimages%2FNovelCover%2FBig%2F2018%2F02%2F5bd399fc-5f91-4e72-8120-8765dceafaee.jpg" alt="">
        </div>
        <div class="loginForm">
          <div class="iptItem">
            <span class="iptName">账号</span>
            <div class="ipt">
              <input type="text" v-model="account" maxlength="11" placeholder="请输入手机号码">
            </div>
          </div>
          <div class="iptItem">
            <span class="iptName">密码</span>
            <div class="ipt">
              <input type="password" :disabled="!(account.length == 11)" v-model="password" placeholder="请输入登录密码">
            </div>
          </div>
          <div class="ovh linkBox">
            <a @click="$navPush('/login/registerPage',{path: returnUrl})" class="link fl">注册</a>
            <a href="" class="link fr">忘记密码</a>
          </div>
          <a title="立即登录" :class="{dis:password.length < 6}" class="btnLogin" @click="login()">立即登录</a>
        </div>
      </div>
      <div class="otherLoginType">
        <span class="title">其他登录方式</span>
        <div class="list">
          <div class="item">
            <p class="txt">验证码登录</p>
          </div>
          <div class="item">
            <p class="txt">微信登录</p>
          </div>
          <div class="item">
            <p class="txt">QQ登录</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mHeader from '../../components/mHeader.vue'
  export default {
    name: 'loginPage',
    components:{mHeader},
    created(){
      this.returnUrl = this.$route.query.path;
    },
    data() {
      return {
        returnUrl: '',
        account: '13640902837',
        password: '123456'
      };
    },
    methods: {
      login(){
        if (this.password.length < 6){
          return;
        }
        if(this.account.length < 11){
          this.$toast('请输入正确的手机号码!');
          return;
        }
        this.$api.account.login(this.account,this.password).then(data=>{
          if(data.code == 1){
            this.$store.commit('setToken',data.data.token);
            this.$store.commit("setTransition", "turn-on");
            this.$router.replace(this.returnUrl);
          }
        });
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
