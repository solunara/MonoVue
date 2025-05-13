import { GET_XYT_TOKEN, REMOVE_XYT_TOKEN } from "@/utils/token"
import axios from "axios"
import { ElMessage } from "element-plus"
import type { UserInfoType } from "@/api/xyt/type"

// axios 全局配置
// axios.defaults.baseURL='/api/ms'

const request = axios.create({
  timeout: 5000
})

// axios 全局请求拦截器
request.interceptors.request.use(config => {
  // 请求之前的处理
  // 解决get请求缓存问题，给每个get请求加个时间戳
  if (config.method == "get") {
    let timeStamp = new Date().getTime()
    if (config.params) {
      config.params.timeStamp = timeStamp
    } else {
      config.params = {
        timeStamp: timeStamp
      }
    }
  }
  // 设置token
  let tokenStr = GET_XYT_TOKEN()
  const userInfoType = JSON.parse(tokenStr as string) as UserInfoType
  if (userInfoType == null || userInfoType.token == "") {
    REMOVE_XYT_TOKEN()
  } else {
    config.headers.set("Authorization", userInfoType.token)
  }
  return config
})

// axios 全局响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    let status = error.response.status
    switch (status) {
      case 404:
        ElMessage({
          type: "error",
          message: "请求的资源不存在"
        })
        break
      case 400:
        ElMessage({
          type: "error",
          message: "请求的参数有误"
        })
        break
      case 403:
        ElMessage({
          type: "error",
          message: "请登陆后再试"
        })
        break
      case 500 | 501 | 502 | 503 | 504 | 505:
        ElMessage({
          type: "error",
          message: "服务器宕机"
        })
        break
    }
    return Promise.reject(error)
  }
)

export default request
