import { API_CONFIG_XYT } from "@/api/xyt/config";
import request  from "@/api/request.js";
import type {
    RespHospitalDetailType,
    ResponseHospitalDepartment,
    ScheduleInfo,
    ResponsePatientsData,
    ResponseRegisterDoctorData,
} from '@/api/xyt/type'

// 根据hosId获取医院信息
export const getHospitalByHosId = (hosId:string) => request.get<any, RespHospitalDetailType>(
    API_CONFIG_XYT.getHospitalDetailApi, {
        params: {
            hosId: hosId,
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
    
// 获取用户的就诊人列表
export const getPatientData = (userId:string) => request.get<any, ResponsePatientsData>(
    API_CONFIG_XYT.getPatientsApi,{
        params: {
            userId: userId,
        }
    })

// getRegisterDoctorApi
export const getRegisterDoctor = (hosId:string, docId:string, workDay:string) => request.get<any, ResponseRegisterDoctorData>(
    API_CONFIG_XYT.getRegisterDoctorApi,{
        params: {
            hosId: hosId,
            docId: docId,
            workDay: workDay,
        }
    })