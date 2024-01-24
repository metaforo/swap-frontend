import axios from 'axios';

// 创建 axios 实例
const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // 你的API基础路径
    timeout: 10000, // 请求超时时间
});

// 设置 post 请求头
// http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
http.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，例如加入 token
        let token = localStorage.getItem('token');
        // token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiMHgwMTEyQzFFMDIwNzA4Yjg0YWFDODU5ODM3MzRBNmZmQjVmQ2U4OTg5MWU4NDE0ZTRFNTRGOTRDRTc1YzA2YTkwIiwiZXhwIjoxNzAxMzU5OTA4fQ.vwJAtCk0sx78A8JWMu2dMRXADfPi4ZV5Sjcv9MJkhCQ';
        if (token) {
            // config.headers.common['Authorization'] = `${token}`;
            config.headers.set("Authorization",`${token}`);
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
// http.interceptors.response.use(
//     response => {
//         // 对响应数据做点什么
//         return response;
//     },
//     error => {
//         // 对响应错误做点什么
//         if (error.response && error.response.status === 401) {
//             // 如果返回401，可以执行登出操作等
//         }
//         return Promise.reject(error);
//     }
// );

export default http;
