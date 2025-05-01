import { API_CONFIG_XYT } from "@/api/xyt/config";
import request  from "@/api/request.js";
import type {
    RespHospitalDetailType,
    ResponseHospitalDepartment
} from '@/api/xyt/type'

// 根据uid获取医院信息
export const getHospitalByUid = (uid:string) => request.get<any, RespHospitalDetailType>(
    API_CONFIG_XYT.getHospitalDetailApi, {
        params: {
            uid: uid,
        }
    })

// 获取医院科室信息
export const getHospitalDepartment = () => request.get<any, ResponseHospitalDepartment>(
    API_CONFIG_XYT.getHospitalDepartmentApi)