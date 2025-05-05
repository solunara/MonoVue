const BASE_URL_XYT = "http://6be3125c.r3.cpolar.cn/xyt"

export const API_CONFIG_XYT = {
    // hospital
    getHospitalApi: `${BASE_URL_XYT}/hos/list`,
    getHospitalGradeApi: `${BASE_URL_XYT}/hos/grade`,
    getHospitalRegionApi: `${BASE_URL_XYT}/hos/region`,
    getHospitalDetailApi: `${BASE_URL_XYT}/hos/detail`,
    getHospitalDepartmentApi: `${BASE_URL_XYT}/hos/department`,
    getHospitalSchedulerApi: `${BASE_URL_XYT}/hos/scheduler`,

    // user
    getPhoneCodeApi: `${BASE_URL_XYT}/user/phone/code`,
    loginWithPhoneApi: `${BASE_URL_XYT}/user/login/phone`,
    getWechatLoginParamApi: `${BASE_URL_XYT}/user/login/wechat/param`,
}