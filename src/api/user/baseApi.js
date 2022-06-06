import { post,get } from "@/utils/request"

export default {
  shareWork(param) {
    return post('/user/shareWork',param);
  },
  getWorkList(param) {
    return post('/user/workList',param);
  },
  getLikeWorks(param) {
    return post('/user/getLikeWorks',param);
  },
  getFollowerWorkList(param) {
    return post('/user/followWorkList',param);
  },
  interaction(param) {
    return post('/user/interaction',param);
  },
  getUserTalk(param) {
    return post('/user/getUserTalk',param);
  },
  getDetailWork(param) {
    return get('/user/workDetail',param);
  },
  resetShareScope(param) {
    return post('/user/resetShareScope',param);
  },
  deleteWork(param) {
    return get('/user/deleteWork',param);
  },
  follow(param) {
    return get('/user/follow',param);
  },
  nofollow(param) {
    return get('/user/noFollow',param);
  },
  getUserWorkList(param) {
    return post('/user/getUserWorkList',param);
  },
  getMyWorkList(param) {
    return post('/user/getMyWorkList',param);
  },
  getOneInfo(param) {
    return get('/user/getOneInfo',param);
  },
  getFollowList(param) {
    return post('/user/followList',param);
  },
  getFansList(param) {
    return post('/user/fansList',param);
  },
  logout() {
    return get('/user/logout',{});
  },
  update(param) {
    return post('/user/update',param);
  },
  seach(param) {
    return post('/user/search',param);
  },
  likeMe(param) {
    return post('/user/likeMe',param);
  },
  getReply(param) {
    return post('/user/getReply',param);
  },
  getMsg() {
    return get('/user/getMsg',{});
  },
  reportWork(param) {
    return get('/user/reportWork',param);
  },
  reportUser(param) {
    return get('/user/reportUser',param);
  },
  readMessage(param) {
    return get('/user/readMessage',param);
  },
  getHotWord() {
    return get('/user/getHotWord',{});
  },
  black(param) {
    return get('/user/black',param);
  }
}