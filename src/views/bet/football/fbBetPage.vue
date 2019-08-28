<template>
  <div class="fbBetPage page">
    <div class="mHeader">
      <goBack class="lf1"></goBack>
      <p class="bet title" @click="isShowBetTitlePop()" tappable>{{title}}</p>
      <a  class="btnMenu btn rg1"></a>
    </div>
    <div class="mleagueList">
      <a title="全部" class="btnAll"
         @click="leagueScreen('all')"
         :class="{cur:chooseLeagueList.length == 0 || chooseLeagueList.length == l_cnlist.length}" tappable>
        全部
      </a>
      <div class="list">
        <a class="item" v-for="(item,index) in l_cnlist" :key="index"
           @click="leagueScreen(item)" tappable
           :class="{cur:chooseLeagueList.indexOf(item) >= 0 && chooseLeagueList.length != l_cnlist.length}">
          {{item}}{{leagueCount.get(item)}}
        </a>
      </div>
    </div>
    <div class="content hasFooter">
      <div class="mBallList">
        <div class="dayItem" v-for="(item,index) in dayRaceVoList" :key="index"
             :class="{open: item.isOpen}"
             v-if="dayMatchLength.get(item.date).get('nl') > 0">
          <p class="title" @click="isOpenListFn(index)">
            {{item.date}} {{item.week}}
            <span class="red">
              {{dayMatchLength.get(item.date).get('nl')}}
            </span>
            场比赛可以选择
          </p>
          <div class="matchList" v-if="item.raceVoList && item.raceVoList.length > 0">
            <div class="matchItem" v-for="(mItem,mIndex) in item.raceVoList" :key="mIndex"
                 v-if="chooseLeagueList.indexOf(mItem.l_cn_abbr) >= 0 || chooseLeagueList.length == 0">
              <div class="isDan"
                   v-if="playType == 6 && (mItem.hadodds && mItem.hadodds.o_type == 'F' && mItem.hadodds.single == '1') || (mItem.hhadodds && mItem.hhadodds.o_type == 'F' && mItem.hhadodds.single == '1')">
                单关
              </div>
              <div class="isDan"
                   v-if="playType == 1 && (mItem.hadodds && mItem.hadodds.o_type == 'F' && mItem.hadodds.single == '1')">
                单关
              </div>
              <div class="isDan"
                   v-if="playType == 2 && (mItem.hhadodds && mItem.hhadodds.o_type == 'F' && mItem.hhadodds.single == '1')">
                单关
              </div>
              <div class="isDan"
                   v-if="playType == 3 && (mItem.scoreOdds && mItem.scoreOdds.o_type == 'F' && mItem.scoreOdds.single == '1')">
                单关
              </div>
              <div class="isDan"
                   v-if="playType == 4 && (mItem.totalOdds && mItem.totalOdds.o_type == 'F' && mItem.totalOdds.single == '1')">
                单关
              </div>
              <div class="isDan"
                   v-if="playType == 5 && (mItem.halfOdds && mItem.halfOdds.o_type == 'F' && mItem.halfOdds.single == '1')">
                单关
              </div>
              <div class="titleBox">
                <div class="teamName tr">
                  <span class="gray fz12">(主)</span>{{mItem.h_cn_abbr}}
                </div>
                <div class="vs tc">VS</div>
                <div class="teamName">
                  {{mItem.a_cn_abbr}}<span class="gray fz12">(客)</span>
                </div>
              </div>
              <div class="cont">
                <div class="infoBox">
                  <div class="middle">
                    <p class="matchNo red">{{mItem.num}}</p>
                    <p class="leagueName">{{mItem.l_cn_abbr}}</p>
                    <p class="stopTime" v-if="mItem.time">{{mItem.time.substring(0,5)}}截止</p>
                  </div>
                </div>
<!--                混合玩法 -->
                <div class="mOddsWrap" v-if="playType == '6'">
                  <div class="oddsBox" v-if="mItem.hadodds && mItem.hhadodds">
                    <div class="noOpen" v-if="!(mItem.hadodds.h && mItem.hadodds.d && mItem.hadodds.a)">
                      暂未开售
                    </div>
                    <div class="oddsList row" v-if="mItem.hadodds.h && mItem.hadodds.d && mItem.hadodds.a"
                         :class="{isDanItem:mItem.hadodds.o_type == 'F' && mItem.hadodds.single == '1'}">
                      <span class="type green">{{mItem.hadodds.fixedodds?mItem.hadodds.fixedodds:0}}</span>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hadodds','h')}"
                           @click="toggleBetItem(playType,mItem,'hadodds','h',mItem.hadodds.h,toggleListMap)">
                        <p class="txt">胜</p>
                        <p class="sp">{{mItem.hadodds.h}}</p>
                      </div>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hadodds','d')}"
                           @click="toggleBetItem(playType,mItem,'hadodds','d',mItem.hadodds.d,toggleListMap)">
                        <p class="txt">平</p>
                        <p class="sp">{{mItem.hadodds.d}}</p>
                      </div>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hadodds','a')}"
                           @click="toggleBetItem(playType,mItem,'hadodds','a',mItem.hadodds.a,toggleListMap)">
                        <p class="txt">负</p>
                        <p class="sp">{{mItem.hadodds.a}}</p>
                      </div>
                    </div>
                    <div class="noOpen" v-if="!(mItem.hhadodds.h && mItem.hhadodds.d && mItem.hhadodds.a)">
                      暂未开售
                    </div>
                    <div class="oddsList row" v-if="mItem.hhadodds.h && mItem.hhadodds.d && mItem.hhadodds.a"
                         :class="{isDanItem:mItem.hhadodds.o_type == 'F' && mItem.hhadodds.single == '1'}">
                      <span class="type orange">{{mItem.hhadodds.fixedodds}}</span>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hhadodds','h')}"
                           @click="toggleBetItem(playType,mItem,'hhadodds','h',mItem.hhadodds.h,toggleListMap)">
                        <p class="txt">胜</p>
                        <p class="sp">{{mItem.hhadodds.h}}</p>
                      </div>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hhadodds','d')}"
                           @click="toggleBetItem(playType,mItem,'hhadodds','d',mItem.hhadodds.d,toggleListMap)">
                        <p class="txt">平</p>
                        <p class="sp">{{mItem.hhadodds.d}}</p>
                      </div>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hhadodds','a')}"
                           @click="toggleBetItem(playType,mItem,'hhadodds','a',mItem.hhadodds.a,toggleListMap)">
                        <p class="txt">负</p>
                        <p class="sp">{{mItem.hhadodds.a}}</p>
                      </div>
                    </div>
                  </div>
                  <a class="btnMore" @click="isMoreOddsPopFn(mItem)">
                    <span v-if="!(toggleListMap.get(mItem.id) && toggleListMap.get(mItem.id).popCount && toggleListMap.get(mItem.id).popCount > 0)">更多<br>玩法</span>
                    <span v-if="toggleListMap.get(mItem.id) && toggleListMap.get(mItem.id).popCount && toggleListMap.get(mItem.id).popCount > 0">
                      已选<br><em class="red">{{toggleListMap.get(mItem.id).popCount}}</em>项
                    </span>
                  </a>
                </div>
<!--                 胜平负-->
                <div class="mOddsWrap" v-if="playType == '1'">
                  <div class="oddsBox" v-if="mItem.hadodds">
                    <div class="oddsList row"
                         :class="{isDanItem:mItem.hadodds.o_type == 'F' && mItem.hadodds.single == '1'}">
                      <span class="type green">0</span>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hadodds','h')}"
                           @click="toggleBetItem(playType,mItem,'hadodds','h',mItem.hadodds.h,toggleListMap)">
                        <p class="txt">胜</p>
                        <p class="sp">{{mItem.hadodds.h}}</p>
                      </div>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hadodds','d')}"
                           @click="toggleBetItem(playType,mItem,'hadodds','d',mItem.hadodds.d,toggleListMap)">
                        <p class="txt">平</p>
                        <p class="sp">{{mItem.hadodds.d}}</p>
                      </div>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hadodds','a')}"
                           @click="toggleBetItem(playType,mItem,'hadodds','a',mItem.hadodds.a,toggleListMap)">
                        <p class="txt">负</p>
                        <p class="sp">{{mItem.hadodds.a}}</p>
                      </div>
                    </div>
                  </div>
                </div>
<!--                 胜平负（让）-->
                <div class="mOddsWrap" v-if="playType == '2'">
                  <div class="oddsBox" v-if="mItem.hhadodds">
                    <div class="oddsList row"
                         :class="{isDanItem:mItem.hhadodds.o_type == 'F' && mItem.hhadodds.single == '1'}">
                      <span class="type orange">{{mItem.hhadodds.fixedodds}}</span>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hhadodds','h')}"
                           @click="toggleBetItem(playType,mItem,'hhadodds','h',mItem.hhadodds.h,toggleListMap)">
                        <p class="txt">胜</p>
                        <p class="sp">{{mItem.hhadodds.h}}</p>
                      </div>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hhadodds','d')}"
                           @click="toggleBetItem(playType,mItem,'hhadodds','d',mItem.hhadodds.d,toggleListMap)">
                        <p class="txt">平</p>
                        <p class="sp">{{mItem.hhadodds.d}}</p>
                      </div>
                      <div class="col oddsItem"
                           :class="{cur: setToggleItemClass(mItem,'hhadodds','a')}"
                           @click="toggleBetItem(playType,mItem,'hhadodds','a',mItem.hhadodds.a,toggleListMap)">
                        <p class="txt">负</p>
                        <p class="sp">{{mItem.hhadodds.a}}</p>
                      </div>
                    </div>
                  </div>
                </div>
<!--                比分  -->
                <div class="mOddsWrap bf" v-if="playType == '3'">
                  <p class="btnBf" tappable @click="isMoreOddsPopFn(mItem)">
                    <span v-if="!(toggleListMap.get(mItem.id) && toggleListMap.get(mItem.id).popCount && toggleListMap.get(mItem.id).popCount > 0)">请选择比分进行投注</span>
                    <span class="red" v-if="toggleListMap.get(mItem.id) && toggleListMap.get(mItem.id).popCount && toggleListMap.get(mItem.id).popCount > 0">
                      <span v-for="(v,k) in toggleListMap.get(mItem.id).choose.get('scoreOdds')" :key="k">
                        ({{setScoreCn(v[0])}})
                      </span>
                    </span>
                  </p>
                </div>
<!--                总进球 -->
                <div class="mOddsWrap zjq" v-if="playType == '4'">
                  <div class="oddsBox" v-if="mItem.totalOdds">
                    <div class="oddsList row">
                      <div class="oddsBox">
                        <div class="oddsList row">
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'totalOdds','s0')}"
                               @click="toggleBetItem(playType,mItem,'totalOdds','s0',mItem.totalOdds.s0,toggleListMap)">
                            <p class="txt">0</p>
                            <p class="sp">{{mItem.totalOdds.s0}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'totalOdds','s1')}"
                               @click="toggleBetItem(playType,mItem,'totalOdds','s1',mItem.totalOdds.s1,toggleListMap)">
                            <p class="txt">1</p>
                            <p class="sp">{{mItem.totalOdds.s1}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'totalOdds','s2')}"
                               @click="toggleBetItem(playType,mItem,'totalOdds','s2',mItem.totalOdds.s2,toggleListMap)">
                            <p class="txt">2</p>
                            <p class="sp">{{mItem.totalOdds.s2}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'totalOdds','s3')}"
                               @click="toggleBetItem(playType,mItem,'totalOdds','s3',mItem.totalOdds.s3,toggleListMap)">
                            <p class="txt">3</p>
                            <p class="sp">{{mItem.totalOdds.s3}}</p>
                          </div>
                        </div>
                        <div class="oddsList row">
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'totalOdds','s4')}"
                               @click="toggleBetItem(playType,mItem,'totalOdds','s4',mItem.totalOdds.s4,toggleListMap)">
                            <p class="txt">4</p>
                            <p class="sp">{{mItem.totalOdds.s4}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'totalOdds','s5')}"
                               @click="toggleBetItem(playType,mItem,'totalOdds','s5',mItem.totalOdds.s5,toggleListMap)">
                            <p class="txt">5</p>
                            <p class="sp">{{mItem.totalOdds.s5}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'totalOdds','s6')}"
                               @click="toggleBetItem(playType,mItem,'totalOdds','s6',mItem.totalOdds.s6,toggleListMap)">
                            <p class="txt">6</p>
                            <p class="sp">{{mItem.totalOdds.s6}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'totalOdds','s7')}"
                               @click="toggleBetItem(playType,mItem,'totalOdds','s7',mItem.totalOdds.s7,toggleListMap)">
                            <p class="txt">7+</p>
                            <p class="sp">{{mItem.totalOdds.s7}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
<!--                半全场 -->
                <div class="mOddsWrap bqc" v-if="playType == '5'">
                  <div class="oddsBox" v-if="mItem.halfOdds">
                    <div class="oddsList row">
                      <div class="oddsBox">
                        <div class="oddsList row">
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'halfOdds','hh')}"
                               @click="toggleBetItem(playType,mItem,'halfOdds','hh',mItem.totalOdds.hh,toggleListMap)">
                            <p class="txt">胜胜</p>
                            <p class="sp">{{mItem.halfOdds.hh}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'halfOdds','hd')}"
                               @click="toggleBetItem(playType,mItem,'halfOdds','hd',mItem.totalOdds.hd,toggleListMap)">
                            <p class="txt">胜平</p>
                            <p class="sp">{{mItem.halfOdds.hd}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'halfOdds','ha')}"
                               @click="toggleBetItem(playType,mItem,'halfOdds','ha',mItem.totalOdds.ha,toggleListMap)">
                            <p class="txt">胜负</p>
                            <p class="sp">{{mItem.halfOdds.ha}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'halfOdds','dh')}"
                               @click="toggleBetItem(playType,mItem,'halfOdds','dh',mItem.totalOdds.dh,toggleListMap)">
                            <p class="txt">平胜</p>
                            <p class="sp">{{mItem.halfOdds.dh}}</p>
                          </div>
                        </div>
                        <div class="oddsList row">
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'halfOdds','da')}"
                               @click="toggleBetItem(playType,mItem,'halfOdds','da',mItem.totalOdds.da,toggleListMap)">
                            <p class="txt">平负</p>
                            <p class="sp">{{mItem.halfOdds.da}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'halfOdds','ah')}"
                               @click="toggleBetItem(playType,mItem,'halfOdds','ah',mItem.totalOdds.ah,toggleListMap)">
                            <p class="txt">负胜</p>
                            <p class="sp">{{mItem.halfOdds.ah}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'halfOdds','ad')}"
                               @click="toggleBetItem(playType,mItem,'halfOdds','ad',mItem.totalOdds.ad,toggleListMap)">
                            <p class="txt">负平</p>
                            <p class="sp">{{mItem.halfOdds.ad}}</p>
                          </div>
                          <div class="col oddsItem"
                               :class="{cur: setToggleItemClass(mItem,'halfOdds','aa')}"
                               @click="toggleBetItem(playType,mItem,'halfOdds','aa',mItem.totalOdds.aa,toggleListMap)">
                            <p class="txt">负负</p>
                            <p class="sp">{{mItem.halfOdds.aa}}</p>
                          </div>
                        </div>
                      </div>
                      <div class="btnMore"
                           :class="{cur: setToggleItemClass(mItem,'halfOdds','dd')}"
                           @click="toggleBetItem(playType,mItem,'halfOdds','dd',mItem.totalOdds.dd,toggleListMap)">
                        <div>
                          <span class="tit">平平</span>
                          <span class="sp">{{mItem.halfOdds.dd}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 投注提交按钮   -->
    <submitOrder :chooseNum="toggleListMap.size" @deleteOrder="deleteOrder()" @submitOrder="submitOrder()"></submitOrder>

    <!--    投注类型选择弹窗 -->
    <mt-popup class="mBetTitlePop"
              v-model="isBetTitlePop"
              position="top">
      <div class="list">
        <div class="item" v-for="(item,index) in titleList"  :key="index"
             @click="changeTitle(item)" :class="{cur: item.type == playType}">
          {{item.title}}
        </div>
      </div>
    </mt-popup>

    <!--  更多玩法弹窗  -->
    <mt-popup class="mOddsPop"
              position="center"
              v-model="isMoreOddsPop">
      <div class="hd">
        <div class="title row">
          <span class="col">{{moreOddsPopData.h_cn_abbr}}</span>
          <span class="vs">vs</span>
          <span class="col">{{moreOddsPopData.a_cn_abbr}}</span>
        </div>
<!--        <p class="sub">胜平负、让球胜平负不支持单关</p>-->
      </div>
      <div class="cont">
        <div class="mOddsWrap" v-if="playType != 3">
          <div class="oddsBox" v-if="moreOddsPopData.hadodds && moreOddsPopData.hadodds">
            <div class="oddsList row">
              <span class="type green">0</span>
              <div class="col oddsItem"
                   :class="{cur: setToggleItemClass(moreOddsPopData,'hadodds','h')}"
                   @click="toggleBetItem(playType,moreOddsPopData,'hadodds','h',moreOddsPopData.hadodds.h,toggleListMap)">
                <p class="txt">胜</p>
                <p class="sp">{{moreOddsPopData.hadodds.h}}</p>
              </div>
              <div class="col oddsItem"
                   :class="{cur: setToggleItemClass(moreOddsPopData,'hadodds','d')}"
                   @click="toggleBetItem(playType,moreOddsPopData,'hadodds','d',moreOddsPopData.hadodds.d,toggleListMap)">
                <p class="txt">平</p>
                <p class="sp">{{moreOddsPopData.hadodds.d}}</p>
              </div>
              <div class="col oddsItem"
                   :class="{cur: setToggleItemClass(moreOddsPopData,'hadodds','a')}"
                   @click="toggleBetItem(playType,moreOddsPopData,'hadodds','a',moreOddsPopData.hadodds.a,toggleListMap)">
                <p class="txt">负</p>
                <p class="sp">{{moreOddsPopData.hadodds.a}}</p>
              </div>
            </div>
            <div class="oddsList row">
              <span class="type orange">{{moreOddsPopData.hhadodds.fixedodds}}</span>
              <div class="col oddsItem"
                   :class="{cur: setToggleItemClass(moreOddsPopData,'hhadodds','h')}"
                   @click="toggleBetItem(playType,moreOddsPopData,'hhadodds','h',moreOddsPopData.hhadodds.i,toggleListMap)">
                <p class="txt">胜</p>
                <p class="sp">{{moreOddsPopData.hhadodds.h}}</p>
              </div>
              <div class="col oddsItem"
                   :class="{cur: setToggleItemClass(moreOddsPopData,'hhadodds','d')}"
                   @click="toggleBetItem(playType,moreOddsPopData,'hhadodds','d',moreOddsPopData.hhadodds.a,toggleListMap)">
                <p class="txt">平</p>
                <p class="sp">{{moreOddsPopData.hhadodds.d}}</p>
              </div>
              <div class="col oddsItem"
                   :class="{cur: setToggleItemClass(moreOddsPopData,'hhadodds','a')}"
                   @click="toggleBetItem(playType,moreOddsPopData,'hhadodds','a',moreOddsPopData.hhadodds.a,toggleListMap)">
                <p class="txt">负</p>
                <p class="sp">{{moreOddsPopData.hhadodds.a}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mOddsWrap">
          <div class="oddsBox" v-if="moreOddsPopData.scoreOdds">
            <div class="oddsList row">
              <span class="type red">胜</span>
              <div class="oddsBox">
                <div class="oddsList row">
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s10')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s10',moreOddsPopData.scoreOdds.s10,toggleListMap)">
                    <p class="txt">1:0</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s10}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s16')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s16',moreOddsPopData.scoreOdds.s16,toggleListMap)">
                    <p class="txt">2:0</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s16}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s17')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s17',moreOddsPopData.scoreOdds.s17,toggleListMap)">
                    <p class="txt">2:1</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s17}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s22')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s22',moreOddsPopData.scoreOdds.s22,toggleListMap)">
                    <p class="txt">3:0</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s22}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s23')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s23',moreOddsPopData.scoreOdds.s23,toggleListMap)">
                    <p class="txt">3:1</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s23}}</p>
                  </div>
                </div>
                <div class="oddsList row">
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s24')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s24',moreOddsPopData.scoreOdds.s24,toggleListMap)">
                    <p class="txt">3:2</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s24}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s26')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s26',moreOddsPopData.scoreOdds.s26,toggleListMap)">
                    <p class="txt">4:0</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s26}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s27')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s27',moreOddsPopData.scoreOdds.s27,toggleListMap)">
                    <p class="txt">4:1</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s27}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s28')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s28',moreOddsPopData.scoreOdds.s28,toggleListMap)">
                    <p class="txt">4:2</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s28}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s29')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s29',moreOddsPopData.scoreOdds.s29,toggleListMap)">
                    <p class="txt">5:0</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s29}}</p>
                  </div>
                </div>
                <div class="oddsList row">
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s30')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s30',moreOddsPopData.scoreOdds.s30,toggleListMap)">
                    <p class="txt">5:1</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s30}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s31')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s31',moreOddsPopData.scoreOdds.s31,toggleListMap)">
                    <p class="txt">5:2</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s31}}</p>
                  </div>
                  <div class="col oddsItem f3"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s3')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s3',moreOddsPopData.scoreOdds.s3,toggleListMap)">
                    <p class="txt">胜其他</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s3}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="oddsList row">
              <span class="type green">平</span>
              <div class="oddsBox">
                <div class="oddsList row">
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s4')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s4',moreOddsPopData.scoreOdds.s4,toggleListMap)">
                    <p class="txt">0:0</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s4}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s11')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s11',moreOddsPopData.scoreOdds.s11,toggleListMap)">
                    <p class="txt">1:1</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s11}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s18')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s18',moreOddsPopData.scoreOdds.s18,toggleListMap)">
                    <p class="txt">2:2</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s18}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s25')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s25',moreOddsPopData.scoreOdds.s25,toggleListMap)">
                    <p class="txt">3:3</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s25}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s2')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s2',moreOddsPopData.scoreOdds.s2,toggleListMap)">
                    <p class="txt">平其他</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s2}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="oddsList row">
              <span class="type blue">负</span>
              <div class="oddsBox">
                <div class="oddsList row">
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s5')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s5',moreOddsPopData.scoreOdds.s5,toggleListMap)">
                    <p class="txt">0:1</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s5}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s6')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s6',moreOddsPopData.scoreOdds.s6,toggleListMap)">
                    <p class="txt">0:2</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s6}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s12')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s12',moreOddsPopData.scoreOdds.s12,toggleListMap)">
                    <p class="txt">1:2</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s12}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s7')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s7',moreOddsPopData.scoreOdds.s7,toggleListMap)">
                    <p class="txt">0:3</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s7}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s13')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s13',moreOddsPopData.scoreOdds.s13,toggleListMap)">
                    <p class="txt">1:3</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s13}}</p>
                  </div>
                </div>
                <div class="oddsList row">
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s19')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s19',moreOddsPopData.scoreOdds.s19,toggleListMap)">
                    <p class="txt">2:3</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s19}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s8')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s8',moreOddsPopData.scoreOdds.s8,toggleListMap)">
                    <p class="txt">0:4</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s8}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s14')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s14',moreOddsPopData.scoreOdds.s14,toggleListMap)">
                    <p class="txt">1:4</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s14}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s20')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s20',moreOddsPopData.scoreOdds.s20,toggleListMap)">
                    <p class="txt">2:4</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s20}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s9')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s9',moreOddsPopData.scoreOdds.s9,toggleListMap)">
                    <p class="txt">0:5</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s9}}</p>
                  </div>
                </div>
                <div class="oddsList row">
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s15')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s15',moreOddsPopData.scoreOdds.s15,toggleListMap)">
                    <p class="txt">1:5</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s15}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s21')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s21',moreOddsPopData.scoreOdds.s21,toggleListMap)">
                    <p class="txt">2:5</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s21}}</p>
                  </div>
                  <div class="col oddsItem f3"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'scoreOdds','s1')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'scoreOdds','s1',moreOddsPopData.scoreOdds.s1,toggleListMap)">
                    <p class="txt">负其他</p>
                    <p class="sp">{{moreOddsPopData.scoreOdds.s1}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mOddsWrap" v-if="playType != 3">
          <div class="oddsBox" v-if="moreOddsPopData.totalOdds">
            <div class="oddsList row">
              <span class="type red">总进球</span>
              <div class="oddsBox">
                <div class="oddsList row">
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'totalOdds','s0')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'totalOdds','s0',moreOddsPopData.totalOdds.s0,toggleListMap)">
                    <p class="txt">0</p>
                    <p class="sp">{{moreOddsPopData.totalOdds.s0}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'totalOdds','s1')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'totalOdds','s1',moreOddsPopData.totalOdds.s1,toggleListMap)">
                    <p class="txt">1</p>
                    <p class="sp">{{moreOddsPopData.totalOdds.s1}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'totalOdds','s2')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'totalOdds','s2',moreOddsPopData.totalOdds.s2,toggleListMap)">
                    <p class="txt">2</p>
                    <p class="sp">{{moreOddsPopData.totalOdds.s2}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'totalOdds','s3')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'totalOdds','s3',moreOddsPopData.totalOdds.s3,toggleListMap)">
                    <p class="txt">3</p>
                    <p class="sp">{{moreOddsPopData.totalOdds.s3}}</p>
                  </div>
                </div>
                <div class="oddsList row">
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'totalOdds','s4')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'totalOdds','s4',moreOddsPopData.totalOdds.s4,toggleListMap)">
                    <p class="txt">4</p>
                    <p class="sp">{{moreOddsPopData.totalOdds.s4}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'totalOdds','s5')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'totalOdds','s5',moreOddsPopData.totalOdds.s5,toggleListMap)">
                    <p class="txt">5</p>
                    <p class="sp">{{moreOddsPopData.totalOdds.s5}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'totalOdds','s6')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'totalOdds','s6',moreOddsPopData.totalOdds.s6,toggleListMap)">
                    <p class="txt">6</p>
                    <p class="sp">{{moreOddsPopData.totalOdds.s6}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'totalOdds','s7')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'totalOdds','s7',moreOddsPopData.totalOdds.s7,toggleListMap)">
                    <p class="txt">7+</p>
                    <p class="sp">{{moreOddsPopData.totalOdds.s7}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mOddsWrap" v-if="playType != 3">
          <div class="oddsBox" v-if="moreOddsPopData.halfOdds">
            <div class="oddsList row">
              <span class="type red">半全场</span>
              <div class="oddsBox">
                <div class="oddsList row">
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'halfOdds','hh')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'halfOdds','hh',moreOddsPopData.halfOdds.hh,toggleListMap)">
                    <p class="txt">胜胜</p>
                    <p class="sp">{{moreOddsPopData.halfOdds.hh}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'halfOdds','hd')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'halfOdds','hd',moreOddsPopData.halfOdds.hd,toggleListMap)">
                    <p class="txt">胜平</p>
                    <p class="sp">{{moreOddsPopData.halfOdds.hd}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'halfOdds','ha')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'halfOdds','ha',moreOddsPopData.halfOdds.ha,toggleListMap)">
                    <p class="txt">胜负</p>
                    <p class="sp">{{moreOddsPopData.halfOdds.ha}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'halfOdds','dh')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'halfOdds','dh',moreOddsPopData.halfOdds.dh,toggleListMap)">
                    <p class="txt">平胜</p>
                    <p class="sp">{{moreOddsPopData.halfOdds.dh}}</p>
                  </div>
                </div>
                <div class="oddsList row">
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'halfOdds','da')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'halfOdds','da',moreOddsPopData.halfOdds.da,toggleListMap)">
                    <p class="txt">平负</p>
                    <p class="sp">{{moreOddsPopData.halfOdds.da}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'halfOdds','ah')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'halfOdds','ah',moreOddsPopData.halfOdds.ah,toggleListMap)">
                    <p class="txt">负胜</p>
                    <p class="sp">{{moreOddsPopData.halfOdds.ah}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'halfOdds','ad')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'halfOdds','ad',moreOddsPopData.halfOdds.ad,toggleListMap)">
                    <p class="txt">负平</p>
                    <p class="sp">{{moreOddsPopData.halfOdds.ad}}</p>
                  </div>
                  <div class="col oddsItem"
                       :class="{cur: setToggleItemClass(moreOddsPopData,'halfOdds','aa')}"
                       @click="toggleBetItem(playType,moreOddsPopData,'halfOdds','aa',moreOddsPopData.halfOdds.aa,toggleListMap)">
                    <p class="txt">负负</p>
                    <p class="sp">{{moreOddsPopData.halfOdds.aa}}</p>
                  </div>
                </div>
              </div>
              <div class="btnMore"
                   :class="{cur: setToggleItemClass(moreOddsPopData,'halfOdds','dd')}"
                   @click="toggleBetItem(playType,moreOddsPopData,'halfOdds','dd',moreOddsPopData.halfOdds.dd,toggleListMap)">
                <div>
                  <span class="txt">平平</span>
                  <span class="sp">{{moreOddsPopData.halfOdds.dd}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mPopBtnBox">
          <a @click="isMoreOddsPopFn()" class="btn cancel">关闭</a>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import goBack from '@/components/goBack'
  import { lotteryType,leagueScreen,toggleBetItem,setScoreCn } from "../common";
  import submitOrder from '@/components/submitOrder'
  export default {
    name: 'fbBetPage',
    components: {goBack,submitOrder},
    activated(){
      // 从投注确认页返回时 同步订单内容数据   其他页面进入时刷新页面
      setTimeout(()=>{
        if(this.fromPath != '/bet/pay/betSubmitPage'){
          this.refresh(1);
        }else{
          this.toggleListMap = new Map();
          this.toggleListMap = this.$store.state.orderList.toggleListMap;
        }
      });
    },
    data () {
      return {
        lotteryType: 'zc', // 彩种类型
        titleList: lotteryType.football, // 投注类型列表
        title: lotteryType.football[0].title, // 头部标题
        playType: lotteryType.football[0].type, // 投注类型
        isBetTitlePop: false, // 投注类型列表 显示/隐藏
        isMoreOddsPop: false, // 更多玩法 显示/隐藏
        moreOddsPopData: {},  // 更多玩法弹窗数据
        dayRaceVoList: [],   // 赛事列表数据
        isOpenList: 0,  // 默认展开 列表
        l_cnlist: [],  // 当前赛事联赛列表
        dayMatchLength: new Map(),  // 获取每天的赛事数量
        leagueCount: new Map(),  // 获取各联赛的赛事总数
        chooseLeagueList: [] , //  联赛筛选 已选条件
        toggleListMap: new Map(), // 选择投注项
        fromPath: '', // 是从哪个页面进入到投注页面到
      }
    },
    beforeRouteEnter(to,from,next){
      next(vm => {
        // 通过 `vm` 访问组件实例,将值传入oldUrl
        vm.fromPath = from.path;
      })
    },
    methods:{
      // 刷新
      refresh(type){
        // type 1:默认刷新 玩法为混合投注  2: 切换玩法类型 页面数据重置刷新
        if(type == 1){
          this.title = lotteryType.football[0].title;
          this.playType = lotteryType.football[0].type;
        }
        this.$store.commit('setOrder','');
        this.chooseLeagueList = [];
        this.toggleListMap = new Map();
        this.getFootballMatch();
      },
      // 获取赛事数据
      getFootballMatch(){
        this.$api.getBetMatch.GetFootballMatch().then(data=>{
          this.dayRaceVoList = data.data.dayRaceVoList;
          this.l_cnlist = data.data.l_cnlist;
          if((this.l_cnlist && this.l_cnlist.length > 0) && (this.dayRaceVoList && this.dayRaceVoList.length > 0)){
            // 获取当前联赛 有多少场赛事
            let returnData = leagueScreen('',this.l_cnlist,this.chooseLeagueList,this.dayRaceVoList);
            this.dayMatchLength = returnData.dayMatchLength;
            this.leagueCount = returnData.leagueCount;
          }
        })
      },
      // 显示/隐藏 投注类型列表
      isShowBetTitlePop(){
        this.isBetTitlePop = !this.isBetTitlePop;
      },
      // 投注类型切换
      changeTitle(item){
        if(item.type != this.playType){
          this.title    = item.title;
          this.playType = item.type;
        }
        this.refresh(2);
        this.isBetTitlePop = false;
      },
      // 清楚选项
      deleteOrder(){
      },
      // 投注确认
      submitOrder(){
        let orderListData = this.$store.state.orderList;
        if(orderListData.toggleListMap && orderListData.toggleListMap.size > 0){
          if(orderListData.isDan && orderListData.toggleListMap.size >= 1){
            this.$navPush('/bet/pay/betSubmitPage',{'playType':this.playType});
          }
          else if(!orderListData.isDan){
            if(orderListData.toggleListMap.size < 2){
              this.$toast('请至少选1场单关或任意2场比赛！');
            }else{
              this.$navPush('/bet/pay/betSubmitPage',{'playType':this.playType});
            }
          }
        }else{
          this.$toast('请至少选1场单关或任意2场比赛！');
        }
      },
      // 展开/收起 列表
      isOpenListFn(index){
        this.dayRaceVoList[index].isOpen = !this.dayRaceVoList[index].isOpen;
        let m = this.dayRaceVoList;
        this.dayRaceVoList = {};
        this.dayRaceVoList = m;
      },
      // 显示 更多玩法弹窗
      isMoreOddsPopFn(item){
        this.isMoreOddsPop = !this.isMoreOddsPop;
        if(this.isMoreOddsPop){
          this.moreOddsPopData = item;
        }
      },
      // 联赛筛选
      leagueScreen(item){
        let isAll = (item == 'all');
        let returnData = leagueScreen(item,this.l_cnlist,isAll?this.l_cnlist:this.chooseLeagueList,this.dayRaceVoList);
        this.chooseLeagueList = returnData.chooseLeagueList;
        this.dayMatchLength = new Map();
        this.dayMatchLength = returnData.dayMatchLength;
      },
      // 选择/取消 投注内容
      toggleBetItem(lotteryPlayType,item,playType,type,val,toggleListMap){
        let m = toggleBetItem(lotteryPlayType,item,playType,type,val,toggleListMap).toggleListMap;
        this.toggleListMap = new Map();
        this.toggleListMap = m;
      },
      // 选中项标记
      setToggleItemClass(item,playType,type){
        let id = this.toggleListMap?this.toggleListMap.get(item.id):'';
        return id && id.choose && id.choose.get(playType) && id.choose.get(playType).get(type);
      },
      // 比分数据 转为 中文字符串
      setScoreCn(key){
        return setScoreCn(key);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
</style>
