import { API_CONFIG_XYT } from "@/api/xyt/config";
import request  from "@/api/request.js";
import type {HospitalListType,ResponseHospitalGrade,ResponseHospitalRegion} from '@/api/xyt/type'

// 获取医院等级
export const getHospitalGrade = () => request.get<any, ResponseHospitalGrade>(API_CONFIG_XYT.getHospitalGradeApi)


// 获取医院地区
export const getHospitalRegion = (cityName:string = '北京') =>  request.get<any, ResponseHospitalRegion>(API_CONFIG_XYT.getHospitalRegionApi, {
        params: {
            cityName: cityName,
        }
    })

// 获取医院信息
export const getHospitalList = (cityName:string = '北京市',  pageNo:number = 1, pageSize:number = 1) => request.get<any, HospitalListType>(
    API_CONFIG_XYT.getHospitalApi, {
        params: {
            cityName: cityName,
            pageNo: pageNo,
            pageSize: pageSize,
        }
    })
