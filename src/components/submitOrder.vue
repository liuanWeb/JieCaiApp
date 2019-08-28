<template>
  <div class="submitOrder">
    <a title="删除" class="btnDelete" @click="deleteOrder()"></a>
    <div class="txtBox">
      <p class="txt">已选 <span class="red">{{chooseNum}}</span> 场</p>
      <p class="sub">至少选1场单关或任意2场比赛</p>
    </div>
    <a title="立即投注" class="btnSubmitOrder" @click="submitOrder()">立即投注</a>
  </div>
</template>

<script>
  export default {
    name: 'submitOrder',
    props:['chooseNum','type'],
    data() {
      return {
      };
    },
    methods: {
      deleteOrder(){
        this.$emit('deleteOrder');
      },
      submitOrder(){
        this.$emit('submitOrder');
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
