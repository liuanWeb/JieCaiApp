<template>
  <div class="tabsPage page">
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="mFooter row">
      <router-link class="col item" to="/tabs/indexPage" @click.native="clickLink">首页</router-link>
      <router-link class="col item" to="/matchPage" @click.native="clickLink">比分</router-link>
      <router-link class="col item" to="/newsPage" @click.native="clickLink">资讯</router-link>
      <router-link class="col item" to="/tabs/userPage" @click.native="clickLink">我的</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tabsPage',
    data () {
      return {

      }
    },
    methods:{
      clickLink() {
        this.$store.commit("setTransition", "turn-on");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>

</style>
