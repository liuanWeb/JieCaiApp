<template>
  <div id="app">
    <transition :name="$store.state.states">
      <keep-alive>
        <router-view class="page" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
      };
    },
    mounted() {
      var _this = this;
      window.addEventListener(
        "popstate",
        function (e) {
          _this.$store.commit("setTransition", "turn-off");
        },
        false
      );
    }
  }
</script>

<style lang="scss" type="text/css" scoped>
  html, body, #app {
    height: 100%;
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .turn-on-enter {
    transform: translate3d(100%, 0, 0);
  }
  .turn-on-leave-to {
    /* transform: translate3d(-20%, 0, 0); */
  }
  .turn-on-enter-active,
  .turn-on-leave-active {
    transition: transform .5s ease;
  }
  .turn-off-enter {
    /* transform: translate3d(-20%, 0, 0); */
  }
  .turn-off-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .turn-off-enter-active,
  .turn-off-leave-active {
    transition: transform .5s ease;
  }
  .turn-off-leave-active,.turn-on-enter-to {
    z-index: 100;
  }
</style>
