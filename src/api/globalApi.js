import { get,post } from "@/utils/request"

export default {
  getCheckMsg() {
    return get('/user/getCheckMsg',{});
  },
  login(param) {
    return post('/user/login',param);
  }
}