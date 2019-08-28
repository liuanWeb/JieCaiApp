<template>
  <div class="indexPage">
    <div class="mHeader">
      <h2 class="title">首页</h2>
    </div>
    <div class="content hasFooter" id="content" @scroll="scroll">
      <div class="mSideBox mBox">
        <mt-swipe :auto="4000">
          <mt-swipe-item>1</mt-swipe-item>
          <mt-swipe-item>2</mt-swipe-item>
          <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="lotteryBox mBox">
        <div class="item"
             v-for="(item,index) in 7" :key="index"
             @click="$navPush('/bet/fbBetPage')">
          <div class="mImgBox">
            <img src="../../assets/icon/test.jpg" alt="">
          </div>
          <p class="title">竞彩足球{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'indexPage',
    created(){
      console.log(this.$store.state.token);
    },
    data () {
      return {
      }
    },
    methods:{
      scroll(event) {
        localStorage.setItem('indexPage',event.target.scrollTop);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
</style>
