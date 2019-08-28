<template>
  <div class="goBack">
    <a @click="goBack(url)" class="btnGoBack btn"></a>
  </div>
</template>

<script>
  export default {
    name: 'goBack',
    props:['url'],
    created(){

    },
    data() {
      return {
      };
    },
    methods: {
      goBack(url){
        this.$store.commit("setTransition", "turn-off");
        if(url){
          this.$router.push({path:url});
        }else{
          this.$router.back(-1);
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .goBack{
    .btnGoBack{
      background: url("../assets/icon/iconGoBack.png") no-repeat center;
      -webkit-background-size: 44px auto;
      background-size: 44px auto;
    }
  }
</style>
