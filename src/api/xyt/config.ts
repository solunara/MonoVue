const BASE_URL_XYT = "http://7480bf5a.r28.cpolar.top/xyt"

export const API_CONFIG_XYT = {
    // hospital
    getHospitalApi: `${BASE_URL_XYT}/hos/list`,
    getHospitalGradeApi: `${BASE_URL_XYT}/hos/grade`,
    getHospitalRegionApi: `${BASE_URL_XYT}/hos/region`,
    getHospitalDetailApi: `${BASE_URL_XYT}/hos/detail`,
    getHospitalDepartmentApi: `${BASE_URL_XYT}/hos/department`,
    getHospitalSchedulerApi: `${BASE_URL_XYT}/hos/scheduler`,
    getPatientsApi: `${BASE_URL_XYT}/hos/patient/list`,
    getRegisterDoctorApi: `${BASE_URL_XYT}/hos/register/doctor`,

    // order
    addOrderApi: `${BASE_URL_XYT}/hos/add/order`,
    getOrderApi: `${BASE_URL_XYT}/hos/order`,
    cancelOrderApi: `${BASE_URL_XYT}/hos/cancel/order`,

    // user
    getPhoneCodeApi: `${BASE_URL_XYT}/user/phone/code`,
    loginWithPhoneApi: `${BASE_URL_XYT}/user/login/phone`,
    getWechatLoginParamApi: `${BASE_URL_XYT}/user/login/wechat/param`,
}