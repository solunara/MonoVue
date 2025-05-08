import { API_CONFIG_XYT } from "@/api/xyt/config";
import request  from "@/api/request.js";
import type {
    RespHospitalDetailType,
    ResponseHospitalDepartment,
    ScheduleInfo,
    ResponsePatientsData,
    ResponseRegisterDoctorData,
    ResponseConfirmRegister,
    ResponseOrderinfo,
    QrCode,
    PayReslt,
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

// 获取挂号时确认订单的医生信息
export const getRegisterDoctor = (scheId:string) => request.get<any, ResponseRegisterDoctorData>(
    API_CONFIG_XYT.getRegisterDoctorApi,{
        params: {
            scheId: scheId,
        }
    })

    
// 确认挂号订单
export const addOrder = (patientId:string, scheId:string) => request.post<any, ResponseConfirmRegister>(
    API_CONFIG_XYT.addOrderApi,{
        patientId: patientId,
        scheId: scheId,
    })

// 获取挂号订单详情
export const getOrder = (orderId:string) => request.get<any, ResponseOrderinfo>(
    API_CONFIG_XYT.getOrderApi,{
        params: {
            orderId:orderId,
        }
    })

// 取消预约挂号
export const cancelOrder = (orderId:string) => request.post<any, ResponseOrderinfo>(
    API_CONFIG_XYT.cancelOrderApi,{
        orderId: orderId,
    })

// 获取支付二维码
export const reqQrcode = (orderId:string) => request.get<any, QrCode>(
    API_CONFIG_XYT.getPayQrCodeApi,{
        params: {
            orderId: orderId,
        }
    })
    
// 获取订单支付结果
export const reqQueryPayState = (orderId:string) => request.get<any, PayReslt>(
    API_CONFIG_XYT.getPayResultApi,{
        params: {
            orderId: orderId,
        }
    })