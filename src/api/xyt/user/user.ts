import { API_CONFIG_XYT } from "@/api/xyt/config";
import request  from "@/api/request.js";
import type {
    ResponsePhoneCode,
    RequestLoginByPhone,
    ResponseLoginType,
    WXLoginResponseData
} from '@/api/xyt/type'

// 获取手机验证码
export const getPhoneCode = (phone:string) => request.get<any, ResponsePhoneCode>(
    API_CONFIG_XYT.getPhoneCodeApi, {
        params: {
            phone: phone,
        }
    })

// 手机验证码登录
export const loginByPhoneCode = (value:RequestLoginByPhone) => request.post<any, ResponseLoginType>(
    API_CONFIG_XYT.loginWithPhoneApi, value)

    
// 获取微信扫码登录参数
export const getWechatLoginParam = (wxuri:string) => request.get<any, WXLoginResponseData>(
    API_CONFIG_XYT.getWechatLoginParamApi, {
        params: {
            wxuri: wxuri,
        }
    })