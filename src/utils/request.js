import axios from 'axios'
// import {getCookie} from './cookie'

import BASE from '@/config/index'
const request = axios.create({

  baseURL:BASE.API,
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
  if(!response.data.success) {
    location.href = "#/lag";
  }
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

function ajaxGet(url,param,method) {
  return new Promise((resolve,reject) => {
    request({
      url:url,
      method:method == null || method == '' ? 'GET' : method,
      params:param
    }).then(res => resolve(res.data)).catch(error => reject(error));
  })
}

//get请求
export function get(url,param){
  return ajaxGet(url,param);
}

//post请求
export function post(url,param){
  return ajax(url,param,'POST');
}
