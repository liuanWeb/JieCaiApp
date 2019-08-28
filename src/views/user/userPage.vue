<template>
  <div class="userPage page">
    <div class="mHeader userHead">
      <div class="headImg mImgBox">
        <img src="../../assets/icon/test.jpg">
      </div>
<!--      <div class="info">-->
<!--        <p class="name">Mick</p>-->
<!--        <p class="tel">16666666666</p>-->
<!--      </div>-->
      <mt-cell title="Mick" class="userLink" label="13666666666" is-link></mt-cell>
    </div>
    <div class="content hasFooter">
      <div class="mCellList">
        <mt-cell title="我的钱包" class="noBorder" is-link>
          <span>交易明细</span>
          <img slot="icon" src="../../assets/icon/iconUserPay.png" width="26" height="26">
        </mt-cell>
        <div class="baseInfoBox">
          <div class="item">
            <p class="num">666</p>
            <p class="sub">账户总额</p>
          </div>
          <div class="item">
            <p class="num">666</p>
            <p class="sub">今日中奖</p>
          </div>
        </div>
      </div>
      <div class="mCellList radius">
        <mt-cell title="投注记录" class="noBorder" is-link>
          <span>全部记录</span>
          <img slot="icon" src="../../assets/icon/iconUserList.png"width="24" height="24">
        </mt-cell>
        <div class="baseInfoBox">
          <div class="item">
            <p class="num">666</p>
            <p class="sub">待出票</p>
          </div>
          <div class="item">
            <p class="num">666</p>
            <p class="sub">待开奖</p>
          </div>
          <div class="item">
            <p class="num">666</p>
            <p class="sub">已中奖</p>
          </div>
        </div>
      </div>
      <div class="mCellList radius">
        <mt-cell title="我的资料" is-link>
          <!--          <span>icon 是图片</span>-->
          <img slot="icon" src="../../assets/icon/iconUserInfo.png"width="24" height="24">
        </mt-cell>
        <mt-cell title="我的消息" is-link>
          <!--          <span>icon 是图片</span>-->
          <img slot="icon" src="../../assets/icon/iconUserMsg.png"width="24" height="24">
        </mt-cell>
      </div>
      <div class="mCellList radius">
        <mt-cell title="帮助中心" is-link>
          <!--          <span>icon 是图片</span>-->
          <img slot="icon" src="../../assets/icon/iconUserHelp.png"width="24" height="24">
        </mt-cell>
        <mt-cell title="客服中心" is-link>
          <!--          <span>icon 是图片</span>-->
          <img slot="icon" src="../../assets/icon/iconUserServer.png"width="24" height="24">
        </mt-cell>
        <mt-cell title="设置" is-link>
          <!--          <span>icon 是图片</span>-->
          <img slot="icon" src="../../assets/icon/iconUserSet.png"width="24" height="24">
        </mt-cell>
        <mt-cell title="退出" @click.native="loginOut()">
          <!--          <span>icon 是图片</span>-->
          <img slot="icon" src="../../assets/icon/iconUserLoginOut.png"width="24" height="24">
        </mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'userPage',
    data () {
      return {

      }
    },
    methods:{
      loginOut(){
        this.$store.commit('removeToken','');
        this.$router.push('/tabs/indexPage');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>

</style>
