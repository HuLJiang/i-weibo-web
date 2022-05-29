import { post } from "@/utils/request"

export default {
  shareWork(param) {
    return post('/user/shareWork',param);
  },
  getWorkList(param) {
    return post('/user/workList',param);
  },
  getFollowerWorkList(param) {
    return post('/user/followWorkList',param);
  },
  interaction(param) {
    return post('/user/interaction',param);
  }
}