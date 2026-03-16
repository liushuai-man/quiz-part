// src/utils/request.js
import axios from 'axios';

// 1. 创建 axios 实例
  const BASE_URL = 'http://127.0.0.1:4523/m1/7906896-7657722-default';
  const request = axios.create({
    baseURL: BASE_URL,
  });

// 2. 请求拦截器 → 发请求前做的事
request.interceptors.request.use(
  (config) => {
    // 统一添加 token（从 pinia / localStorage 取）
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 3. 响应拦截器 → 拿到数据后做的事
request.interceptors.response.use(
  (response) => {
    // 直接返回后端数据，不用每次 .data
    return response.data;
  },
  (error) => {
    // 统一处理错误
    console.error('请求错误：', error);
    return Promise.reject(error);
  },
);

export default request;
