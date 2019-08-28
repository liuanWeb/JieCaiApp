<template>
  <div class="registerPage loginPage">
    <mHeader title="注  册"></mHeader>
    <div class="content">
      <div class="registerBox loginBox">
        <p class="tips">Welcome to JieCai App...</p>
        <div class="loginForm registerForm">
          <div class="iptItem">
            <span class="iptName">手机号码</span>
            <div class="ipt">
              <input type="text" v-model="account" placeholder="请输入手机号码">
            </div>
          </div>
<!--          <div class="iptItem">-->
<!--            <span class="iptName">验证码</span>-->
<!--            <div class="ipt">-->
<!--              <input type="text" placeholder="请输入验证码">-->
<!--            </div>-->
<!--            <a href="" class="btnGetCode">获取验证码</a>-->
<!--          </div>-->
          <div class="iptItem">
            <span class="iptName">登录密码</span>
            <div class="ipt">
              <input type="text" v-model="password" placeholder="请输入登录密码">
            </div>
          </div>
          <div class="iptItem">
            <span class="iptName">确认密码</span>
            <div class="ipt">
              <input type="text" v-model="passwordAgian" placeholder="请再次输入登录密码">
            </div>
          </div>
          <div class="agreementBox iptItem">
            <input type="checkbox" v-model="agreement" id="agreement">
            <label for="agreement">我已阅读并同意 《用户服务协议》</label>
          </div>
          <a title="立即注册" @click="register()" class="btnLogin">立即注册</a>
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
        password: '123456',
        passwordAgian: '123456',
        agreement: false
      };
    },
    methods: {
      register(){
        if(this.account.length < 11){
          this.$toast('请输入正确的手机号码!');
          return;
        }
        if(this.password.length < 6){
          this.$toast('密码长度不能低于6!');
          return;
        }
        if(this.password.length != this.passwordAgian.length || this.password != this.passwordAgian){
          this.$toast('登录密码不一致!');
          return;
        }
        if(!this.agreement){
          this.$toast('请阅读并同意用户协议!');
          return;
        }
        this.$api.account.register(this.account,this.password).then(data=>{
          if(data.code == 1){
            this.$store.commit('setToken',data.data.token);
            this.$toast({
              message: `${data.msg},自动登录中。`,
              direction: 500
            });
            setTimeout(()=>{
              this.$navPush(this.returnUrl);
            },800);
          }
        });
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
