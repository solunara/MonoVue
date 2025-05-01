import { API_CONFIG_XYT } from "@/api/xyt/config";
import request  from "@/api/request.js";
import type {
    RespHospitalDetailType
} from '@/api/xyt/type'

// 根据uid获取医院信息
export const getHospitalByUid = (uid:string) => request.get<any, RespHospitalDetailType>(
    API_CONFIG_XYT.getHospitalDetailApi, {
        params: {
            uid: uid,
        }
    })