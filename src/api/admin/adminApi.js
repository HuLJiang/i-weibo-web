import { get,post } from "@/utils/request"

export default {
  addUser() {
    return get('/admin/addUser',{});
  },
  delete(param) {
    return get('/admin/delete',param);
  },
  resetPassword(param) {
    return get('/admin/resetPassword',param);
  },
  modifyUser(param) {
    return post('/admin/modifyUser',param);
  },
  getWorkList(param) {
    return post('/admin/getWorkList',param);
  },
  getUserList(param) {
    return post('/admin/getUserList',param);
  },
  setRole(param) {
    return post('/superAdmin/setRole',param);
  }
}