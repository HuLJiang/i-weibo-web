import { get,post } from "@/utils/request"

export default {
  getCheckMsg() {
    return get('/user/getCheckMsg',{});
  },
  login(param) {
    return post('/user/login',param);
  },
  tokenLogin() {
    return post('/user/tokenLogin',{});
  },
  register(param) {
    return post('/user/register',param);
  },
  getUserInfo() {
    return post('/user/getUserInfo',{});
  }
}