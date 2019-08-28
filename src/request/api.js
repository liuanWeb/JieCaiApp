// 统一管理接口
import QS from 'qs';
import { get, post } from './http';

const apiHost = process.env.API_HOST;

const getBetMatch = {
  GetFootballMatch(FootballGameType){
    // 1=胜平负，2=让球胜平负，3=比分，4=总进球数，5=半全场平负，不填为所有赔率数据
    return post(apiHost + 'FootballMatch/GetFootballMatch',{FootballGameType:FootballGameType})
  }
};

const account = {
  login(account,pwd){
    return post(apiHost + 'WebLogin/LoginIn',{account:account,pwd:pwd})
  },
  register(Phone,PassWord){
    return post(apiHost + 'WebLogin/Register',{Phone:Phone,PassWord:PassWord})
  },
}

export default {
  getBetMatch,
  account
}

