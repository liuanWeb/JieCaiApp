<template>
  <div class="betSubmitPage">
    <mHeader title="投注确认"></mHeader>
    <div class="content hasFooter">
      <p class="tips">2019-08-08 19:00截止,请尽快提交投注。</p>
      <a class="btnAdd" @click="goBack()">+手动添加比赛</a>
      <div class="list">
        <div v-for="(value,key) in toggleListMap" :key="key">
          <div class="item" v-for="(item,index) in value" :key="index" v-if="item.race">
            <div class="deleteBox">
              <a @click="deleteItem(item.id)" class="btnDel"></a>
            </div>
            <div class="infoBox">
              <div class="hd" v-if="item.race">
                <span class="name">{{item.race.h_cn_abbr}}</span>
                <span class="vs">vs</span>
                <span class="name">{{item.race.a_cn_abbr}}</span>
              </div>
              <div class="oddsBox" v-if="item.choose">
                <div v-for="(v,k) in item.choose" :key="k" class="oddsItem gray">
                  <span v-if="v[0] == 'hadodds'">胜平负:</span>
                  <span v-if="v[0] == 'hhadodds'">让球胜平负({{item.race.hhadodds.fixedodds}}):</span>
                  <span v-if="v[0] == 'totalOdds'">总进球:</span>
                  <span v-if="v[0] == 'scoreOdds'">全场比分:</span>
                  <span v-if="v[0] == 'halfOdds'">半全场:</span>
                  <span v-for="(item2,index2) in v[1]" :key="index2">
                      <span class="red" v-if="v[0] != 'totalOdds'">
                        {{setScoreCn(item2[0])}}({{item2[1]}})
                      </span>
                      <span class="red" v-if="v[0] == 'totalOdds'">
                        {{setScoreCn(item2[0],'totalOdds')}}({{item2[1]}})
                      </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--    底部提交订单按钮-->
    <div class="betFooter">
      <div class="setMultiple">
        <a title="选择串关方式" class="item">选择串关方式</a>
        <a title="设置投注倍数" class="item" @click="setNumber()">投 <span class="red">{{submitParams.Number}}</span> 倍</a>
      </div>
      <div class="submitOrder">
        <div class="txtBox">
          <p class="txt">金额 <span class="red">{{submitParams.Multiple * submitParams.Number * 2}}</span> 元</p>
          <p class="sub">预计奖金 <span class="rend">{{bonusMin * submitParams.Number * 2}} ~ {{bonusMax}}</span> 元</p>
        </div>
        <a title="我要投注" class="btnSubmitOrder" @click="submitOrder()">我要投注</a>
      </div>
    </div>
<!--    选择过关方式-->
    <mt-popup class="passTypePop" v-model="isShowPassType">

    </mt-popup>
  </div>
</template>

<script>
  import mHeader from '@/components/mHeader'
  import { setScoreCn,toggleItemToStr,getMultiple } from "../common";

  export default {
    name: 'betSubmitPage',
    components:{
      mHeader
    },
    activated(){
      this.toggleListMap = new Map();
      this.orderList = this.$store.state.orderList;
      this.toggleListMap = this.orderList.toggleListMap;
      this.submitParams.PlayType = this.$route.query.playType;
      this.submitParams.Multiple = getMultiple(this.toggleListMap).multiple;
      this.bonusMin = (getMultiple(this.toggleListMap).min).toFixed(2);
      this.bonusMax = (getMultiple(this.toggleListMap).max).toFixed(2);
      console.log(this.bonusMin,this.bonusMax);
    },
    data () {
      return {
        orderList: {}, // 订单内容
        toggleListMap: new Map(), // 已选投注内容
        submitParams: {   // 投注提交内容
          PlayType: '', // 玩法类型
          Multiple: 1, // 注数
          PassType: '', // 过关方式
          Number: 1, // 倍数
          Content: '', // 投注内容
        },
        passTypeList: [], // 串关方式
        isShowPassType: false, // 选择串关方式
        bonusMin: 1,
        bonusMax: 1,
      }
    },
    methods:{
      // 投注内容 转为 中文显示
      setScoreCn(key,type){
        return setScoreCn(key,type);
      },
      // 删除 赛事
      deleteItem(id){
        this.toggleListMap.delete(id);
        let m = this.toggleListMap;
        this.toggleListMap = new Map();
        this.toggleListMap = m;
        this.orderList.toggleListMap = this.toggleListMap;
        this.$store.commit('setOrder',this.orderList);
        this.submitParams.Multiple = getMultiple(this.toggleListMap).countM;
      },
      // 手动添加赛事 即返回赛事列表
      goBack(){
        this.$store.commit("setTransition", "turn-off");
        this.$router.back(-1);
      },
      // 选择倍数
      setNumber(){
        this.$messagebox.prompt('',{
          title:'投注倍数',
          message: '倍数越大，奖金越高哦！',
          closeOnClickModal:false,
          inputPattern: /^[1-9]\d*$/,
          inputErrorMessage: '请输入正确的倍数，正整数',
          inputPlaceholder: '请输入投注倍数'
        }).then(({value,action})=>{
          this.submitParams.Number = value;
        }).catch(()=>{
        });
      },
      // 提交订单
      submitOrder(){
        this.submitParams.Content = JSON.stringify(toggleItemToStr(this.toggleListMap));
        console.log(this.submitParams);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
</style>
