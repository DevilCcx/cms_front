import axios from 'axios' // 注意先安装哦
import {axiosConfig} from '../config/base.config.js' // 导入默认配置
import qs from 'qs' // 序列化请求数据
import {Message} from 'element-ui'; //错误提示

export default function $axios (options) {
    return new Promise((resolve, reject) => {
        let body = {
            baseURL: axiosConfig.baseURL,
            headers: {},
            transformResponse: [function (data) {}]
        };

        //登陆不需要token
        if (options.url !== 'api/auth/login') {
            let auth = localStorage.getItem('auth');
            if (auth) {
                body.headers.Authorization = 'Bearer ' + JSON.parse(auth).accessToken;
            }
        }

        const instance = axios.create(
            body
        );

        // request 拦截器
        instance.interceptors.request.use(
            config => {
                // Tip: 1
                // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画

                // Tip: 2
                // 带上 token , 可以结合 vuex 或者重 localStorage
                // if (store.getters.token) {
                //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
                // } else {
                //     // 重定向到登录页面
                // }

                // Tip: 3
                // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
                if (config.method.toLocaleLowerCase() === 'post'
                    || config.method.toLocaleLowerCase() === 'put'
                    || config.method.toLocaleLowerCase() === 'delete') {

                    config.data = qs.stringify(config.data)
                }
                return config
            },
            error => {
                // 请求错误时做些事(接口错误、超时等)
                // Tip: 4
                // 关闭loadding
                console.log('request:', error);

                //  1.判断请求超时
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    // return service.request(originalRequest);//例如再重复请求一次
                }
                //  2.需要重定向到错误页面
                const errorInfo = error.response;
                console.log(errorInfo);
                if (errorInfo) {
                    // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                    const errorStatus = errorInfo.status; // 404 403 500 ... 等
                    router.push({
                        path: `/error/${errorStatus}`
                    })
                }
                return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
            }
        );

        // response 拦截器
        instance.interceptors.response.use(
            response => {
                let data;
                // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                if(response.data === undefined){
                    data = JSON.parse(response.request.responseText)
                } else{
                    data = response.data
                }
                //后端接口返回code约定
                if (0 !== data.code) {
                    throw {message: data.msg};
                }
                return data
            },
            err => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误';
                            break;

                        case 401:
                            err.message = '未授权，请登录';
                            localStorage.removeItem('auth');
                            window.location.href = '/#/login';
                            break;

                        case 403:
                            err.message = '拒绝访问';
                            break;

                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`;
                            break;

                        case 408:
                            err.message = '请求超时';
                            break;

                        case 500:
                            err.message = '服务器内部错误';
                            break;

                        case 501:
                            err.message = '服务未实现';
                            break;

                        case 502:
                            err.message = '网关错误';
                            break;

                        case 503:
                            err.message = '服务不可用';
                            break;

                        case 504:
                            err.message = '网关超时';
                            break;

                        case 505:
                            err.message = 'HTTP版本不受支持';
                            break;

                        default:
                    }
                }
                throw err;
                // return Promise.reject(err) // 返回接口返回的错误信息
            }
        );

        //请求处理
        instance(options)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                //element 提示组件
                Message.error({
                    showClose: true,
                    message: error.message,
                });
                reject(error);
            })
    })
}
