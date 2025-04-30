import { API_CONFIG_XYT } from "@/api/xyt/config";
import request  from "@/api/request.js";
import type {HospitalListType} from '@/api/xyt/type'
export const getHospitalGrade = ()=>{
    return request.get(API_CONFIG_XYT.getHospitalGradeApi)
}

export const getHospitalRegion = (cityName = '北京')=>{
    return request.get(API_CONFIG_XYT.getHospitalRegionApi, {
        params: {
            cityName: cityName,
        }
    })
}

export const getHospitalList = (cityName:string = '北京市',  pageNo:number = 1, pageSize:number = 1) => request.get<any, HospitalListType>(
    API_CONFIG_XYT.getHospitalApi, {
        params: {
            cityName: cityName,
            pageNo: pageNo,
            pageSize: pageSize,
        }
    })
