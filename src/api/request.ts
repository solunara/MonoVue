import axios from 'axios'
import { ElMessage } from 'element-plus'

// axios 全局配置
// axios.defaults.baseURL='/api/ms'

const request = axios.create({
    timeout: 5000
});

// axios 全局请求拦截器
axios.interceptors.request.use(
    (config)=>{
        // 请求之前的处理
        // 解决get请求缓存问题，给每个请求加个时间戳
        if (config.method == 'get') {
            let timeStamp = (new Date()).getTime()
            if (config.params){
                config.params.timeStamp=timeStamp
            }else{
                config.params = {
                    timeStamp: timeStamp,
                }
            }
        }
        // TODO: 设置token
        return config
    }
);

// axios 全局响应拦截器
axios.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        switch (error.response.status) {
            case 404:
                ElMessage({
                    type: 'error',
                    message: '请求的路径不存在',
                });
                break;
            case 400:
                ElMessage({
                    type: 'error',
                    message: '请求的参数有误',
                });
                break;
            case 500 | 501 | 502 | 503 | 504 | 505:
                ElMessage({
                    type: 'error',
                    message: '服务器宕机',
                });
                break;
        }
        return Promise.reject(error)
    },
);

export default request;