import { API_CONFIG_XYT } from "@/api/xyt/config";
import request  from "@/api/request.js";
import type {
    RespHospitalDetailType,
    ResponseHospitalDepartment,
    ScheduleInfo
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

// 获取医院科室医生排班信息
export const getHospitalScheduler = (hosId:string, deptId:string, pageNo:number = 1, pageSize:number = 1) => request.get<any, ScheduleInfo>(
    API_CONFIG_XYT.getHospitalSchedulerApi,{
        params: {
            hosId: hosId,
            deptId:deptId,
            pageNo:pageNo,
            pageSize:pageSize,
        }
    })