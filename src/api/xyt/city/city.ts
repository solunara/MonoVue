import { API_CONFIG_XYT } from "@/api/xyt/config";
import request  from "@/api/request.js";
import type {
    ResponseCascaderCity,
    
} from '@/api/xyt/type'

// 获取级联城市信息
export const reqCascaderCity = (code:string) => request.get<any, ResponseCascaderCity>(
    API_CONFIG_XYT.getCascaderCityApi, {
        params: {
            code: code,
        }
    })