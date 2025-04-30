import { API_CONFIG_XYT } from "@/api/xyt/config";
import request  from "@/api/request.js";

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

export const getHospitalList = (cityName = '北京市',  pageNo = 1, pageSize = 1)=>{
    return request.get(API_CONFIG_XYT.getHospitalApi, {
        params: {
            cityName: cityName,
            pageNo: pageNo,
            pageSize: pageSize,
        }
    })
}