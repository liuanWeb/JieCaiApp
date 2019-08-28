<template>
  <div class="mHeader">
    <goBack class="lf1" :url="url"></goBack>
    <p class="title">{{title}}</p>
  </div>
</template>

<script>
  import goBack from './goBack.vue'
  export default {
    name: 'mHeader',
    props:['title','url'],
    components:{goBack},
    created(){

    },
    data() {
      return {
      };
    },
    methods: {
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
