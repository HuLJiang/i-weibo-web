import axios from 'axios'
// import {getCookie} from './cookie'

import BASE_URL from '@/config/index'
const request = axios.create({

  baseURL:BASE_URL,
  timeout:10000
});

request.interceptors.request.use(config => {
  //设置请求头
  // config.headers.token = getCookie('token');
  config.headers.token = localStorage.getItem('token');
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})
request.interceptors.response.use(response => {
  return response;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

function ajax(url,param,method) {
  return new Promise((resolve,reject) => {
    request({
      url:url,
      method:method == null || method == '' ? 'GET' : method,
      data:param
    }).then(res => resolve(res.data)).catch(error => reject(error));
  })
}

//get请求
export function get(url,param){
  return ajax(url,param,'GET');
}

//post请求
export function post(url,param){
  return ajax(url,param,'POST');
}
