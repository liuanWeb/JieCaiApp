import { store } from "../../untils/store";
// 投注 彩种玩法
const lotteryType = {
  football: [
    {
      title: '混合投注',
      type: '6'
    },
    {
      title: '胜平负',
      type: '1'
    },
    {
      title: '让球胜平负',
      type: '2'
    },
    {
      title: '比分',
      type: '3'
    },
    {
      title: '总进球',
      type: '4'
    },
    {
      title: '半全场',
      type: '5'
    }
  ],
  basketball: [
    {
      title: '混合投注',
      type: 'hhtz'
    },
    {
      title: '胜负(让)',
      type: 'rsf'
    },
    {
      title: '大小分',
      type: 'dxf'
    },
    {
      title: '胜分差',
      type: 'sfc'
    }
  ]
}

// 联赛筛选 并获取 已选联赛下 当天赛事场次
// item：               当前选择的联赛名称
// leagueList：         联赛列表
// chooseLeagueList：   已选择的联赛列表
// matchList：          总赛事列表
const leagueScreen = function (item,leagueList,chooseLeagueList,matchList) {
  let returnData = {
    chooseLeagueList: chooseLeagueList,  // 已选联赛列表
    dayMatchLength: new Map(),           // 选择联赛今日赛事场次
    leagueCount: new Map(),              // 各联赛 的赛事数量
  };
  matchList.forEach((k,v)=>{
    k.isOpen = (v == 0);
    returnData.dayMatchLength.set(k.date,new Map());
    leagueList.forEach((k2,v2)=>{
      let l = 0;
      k.raceVoList.forEach((k3,v3)=>{
        (k3.l_cn_abbr == k2) && l++;
      });
      returnData.dayMatchLength.get(k.date).set('dnl',k.raceVoList.length);
      returnData.dayMatchLength.get(k.date).set('nl',k.raceVoList.length);
      returnData.dayMatchLength.get(k.date).set(k2,l);
    });
  });

  // 获取每个联赛的赛事场次
  leagueList.forEach((v,k)=>{
    let m = 0;
    matchList.forEach((v2,k2)=>{
      m += returnData.dayMatchLength.get(v2.date).get(v);
    });
    returnData.leagueCount.set(v,m);
  })

  if(item){
    let _indexOf = returnData.chooseLeagueList.indexOf(item);
    (_indexOf >= 0)?returnData.chooseLeagueList.splice(_indexOf,1):returnData.chooseLeagueList.push(item);
    (returnData.chooseLeagueList.length == leagueList.length) && (returnData.chooseLeagueList = []);
  }
  if(returnData.chooseLeagueList.length > 0 ){
    returnData.dayMatchLength.forEach((k,v)=>{
      let l = 0;
      returnData.chooseLeagueList.forEach((k2,v2)=>{
        l += k.get(k2);
        returnData.dayMatchLength.get(v).set('nl',l);
      });
    });
  }else{
    returnData.dayMatchLength.forEach((k,v)=>{
      returnData.dayMatchLength.get(v).set('nl',returnData.dayMatchLength.get(v).get('dnl'));
    });
  }
  // console.log(returnData.leagueCount);
  return returnData;
}

// 投注选中/取消选中
// lotteryType：   彩种类型
// lotteryPlayType: 玩法
// item：          选中项
// playType：      玩法类型
// type：          投注选项
// val：           投注选项赔率
// toggleListMap： 当前已选项
const toggleBetItem = function (lotteryPlayType,item,playType,type,val,toggleListMap) {
  let returnData = {
    toggleListMap: toggleListMap,
    isDan: false
  };
  let id = item.id;
  if(!returnData.toggleListMap.get(id)){
    returnData.toggleListMap.set(id,{
      id: id,
      race: item,
      choose: new Map().set(playType, new Map().set(type,val))
    });
  }else{
    let list = returnData.toggleListMap.get(id).choose;
    // 如果没选过此赛事的 该种 玩法
    if(!list.get(playType)){
      // 新增
      list.set(playType, new Map().set(type,val));
    }else{
      // 不存在该值 新增
      if(!list.get(playType).get(type)){
        list.get(playType).set(type,val);
      }else{
        // 存在该值 删除
        list.get(playType).delete(type);
        // 如果该玩法都没选中 删除该玩法
        if(list.get(playType).size==0){
          list.delete(playType);
        }
      }
    }
    if(list.size == 0){
      returnData.toggleListMap.delete(id);
    }
  }
  // 1.判断是否有单关选项 2.获取每个赛事的选项个数
  returnData.toggleListMap.forEach((v,k)=>{
    let count = 0;
    v.choose.forEach((v2,k2)=>{
      count += v2.size;
      // 判断是否有单关选项
      if(v.race[k2]['o_type'] == 'F' && v.race[k2]['single'] == '1'){
        returnData.isDan = true;
      }
    });
    // 获取每个赛事选项个数
    (returnData.toggleListMap.get(id)) && (returnData.toggleListMap.get(id).popCount = count);
  });
  store.commit('setOrder',returnData);
  return returnData;
};

// 根据已选内容 转为json 字符串
const toggleItemToStr = function (toggleListMap) {
  let ct= {
    Content:[]  // 投注内容
  };
  toggleListMap.forEach((v,k)=>{
    let item = {
      MatchId: v.id,
      PlayTypeList:[]
    };
    let count = 0;
    v.choose.forEach((v2,k2)=>{
      count += v2.size;
      let item2 = {
        SpType: k2,
        SpList:[]
      };
      v2.forEach((v3,k3)=>{
        let item3 = k3 + '-' + v3;
        item2.SpList.push(item3);
      });
      item.PlayTypeList.push(item2);
    });
    ct.Content.push(item);
  });
  return ct;
}



// 根据比分字段名 返回中文比分
const setScoreCn = function (key,type = null) {
  let txt = '';
  if(type == 'totalOdds'){
    switch(key){
      case 's0':
        txt = '0球';
        break;
      case 's1':
        txt = '1球';
        break;
      case 's2':
        txt = '2球';
        break;
      case 's3':
        txt = '3球';
        break;
      case 's4':
        txt = '4球';
        break;
      case 's5':
        txt = '5球';
        break;
      case 's6':
        txt = '6球';
        break;
      case 's7':
        txt = '7+球';
        break;
      default:
        break;
    }
  }else{
    switch (key) {
      case 's1':
        txt = '负其他';
        break;
      case 's2':
        txt = '平其他';
        break;
      case 's3':
        txt = '胜其他';
        break;
      case 's4':
        txt = '0:0';
        break;
      case 's5':
        txt = '0:1';
        break;
      case 's6':
        txt = '0:2';
        break;
      case 's7':
        txt = '0:3';
        break;
      case 's8':
        txt = '0:4';
        break;
      case 's9':
        txt = '0:5';
        break;
      case 's10':
        txt = '1:0';
        break;
      case 's11':
        txt = '1:1';
        break;
      case 's12':
        txt = '1:2';
        break;
      case 's13':
        txt = '1:3';
        break;
      case 's14':
        txt = '1:4';
        break;
      case 's15':
        txt = '1:5';
        break;
      case 's16':
        txt = '2:0';
        break;
      case 's17':
        txt = '2:1';
        break;
      case 's18':
        txt = '2:2';
        break;
      case 's19':
        txt = '2:3';
        break;
      case 's20':
        txt = '2:4';
        break;
      case 's21':
        txt = '2:5';
        break;
      case 's22':
        txt = '3:0';
        break;
      case 's23':
        txt = '3:1';
        break;
      case 's24':
        txt = '3:2';
        break;
      case 's25':
        txt = '3:3';
        break;
      case 's26':
        txt = '4:0';
        break;
      case 's27':
        txt = '4:1';
        break;
      case 's28':
        txt = '4:2';
        break;
      case 's29':
        txt = '5:0';
        break;
      case 's30':
        txt = '5:1';
        break;
      case 's31':
        txt = '5:1';
        break;
      case 'h':
        txt = '主胜';
        break;
      case 'd':
        txt = '平';
        break;
      case 'a':
        txt = '客胜';
        break;
      case 'aa':
        txt = '负负';
        break;
      case 'ad':
        txt = '负平';
        break;
      case 'ah':
        txt = '负胜';
        break;
      case 'da':
        txt = '平负';
        break;
      case 'dd':
        txt = '平平';
        break;
      case 'dh':
        txt = '平胜';
        break;
      case 'ha':
        txt = '胜负';
        break;
      case 'hd':
        txt = '胜平';
        break;
      case 'hh':
        txt = '胜胜';
        break;
      default:
        break;
    }
  }
  return txt;
};

// 获取注数 以及最大 最小 赔率
const getMultiple = function (toggleListMap) {
  let returnData = {
    multiple: 1,
    max: 1,
    min: 1
  };
  toggleListMap.forEach((v,k)=>{
    let m = 0;
    let a = [];
    v.choose.forEach((v2,k2)=>{
      m += v2.size;
      v2.forEach((v3,k3)=>{
        a.push(v3);
      });
    });
    let max = Math.max.apply(Math,a)?Math.max.apply(Math,a):1;
    let min = Math.min.apply(Math,a)?Math.min.apply(Math,a):1;
    returnData.max *= max;
    returnData.min *= min;
    returnData.multiple *= m;
  });
  return returnData;
}

export {
  lotteryType,
  leagueScreen,
  toggleBetItem,
  setScoreCn,
  toggleItemToStr,
  getMultiple
}
