import axios from 'axios';
import { getBaseUrl } from '../config/index';

import { Loading, Message } from 'element-ui'
var loading = null; //loading
const baseURL = getBaseUrl();

const service = axios.create({
    baseURL: baseURL,
    // 请求超时时间(ms)
    timeout: 5000
});
/* 请求拦截器 */
service.interceptors.request.use(config => {
    loading = Loading.service({ text: '拼命加载中...' })
    config.data = JSON.stringify(config.data);
    // 设置请求头
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    // 在发送请求之前做些什么
    return config;
},
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

/* 响应拦截器 */
service.interceptors.response.use(response => {
    // if(response.status=='200'){
    //     console.log('222');
    // }
    // 关闭loading
    if (loading) {
        loading.close()
    }
    // 对响应数据做些什么
    return response;
},
    error => {
        // 如果不加人这个 是一直loading（比如报了404 会有弹窗 然后这个loading还会一直转呀转 转呀转 ）
        if (loading) {
            loading.close()
          }
          console.log(error);
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    Message({
                        message: '错误请求',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                case 401:
                    Message({
                        message: '未授权，请重新登录',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                case 403:
                    Message({
                        message: '拒绝访问',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                case 404:
                    Message({
                        message: '未找到资源',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                case 405:
                    Message({
                        message: '请求方法未允许',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                case 408:
                    Message({
                        message: '请求超时',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                case 500:
                    Message({
                        message: '服务器端出错',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                case 501:
                    Message({
                        message: '网络未实现',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                case 502:
                    Message({
                        message: '网络错误',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                case 503:
                    Message({
                        message: '服务不可用',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                case 504:
                    Message({
                        message: '网络超时',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                case 505:
                    Message({
                        message: 'http版本不支持该请求',
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
                    break;
                default:
                    Message({
                        message: `连接错误${err.response.status}`,
                        type: 'error',
                        offset: 0,
                        duration: 3000
                    });
            }
        }
        // 对响应错误做些什么
        return Promise.reject(error);

    }
);

export default {
    /* 封装POST方法 */
    post(url, data = {}) {
        // 请求发出前可以进行一些处理
        console.log(url, 9999)
        return service.post(url, data).then(res => {
            // 对请求返回值进行一些处理
            return res;
        }, err => {
            return Promise.reject(err);
        });
    },
    /* 封装GET方法 */
    get(url, params) {
        // 请求发出前做一些处理
        return service({
            method: 'get',
            url: url,
            params
        }).then(
            res => {
                return res;
            },
            err => {
                return Promise.reject(err);
            }
        );
    }
};
