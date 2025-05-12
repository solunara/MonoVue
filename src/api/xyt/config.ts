const BASE_URL_XYT = "http://6e149e73.r28.cpolar.top/xyt"

export const API_CONFIG_XYT = {
    // hospital
    getHospitalApi: `${BASE_URL_XYT}/hos/list`,
    getHospitalGradeApi: `${BASE_URL_XYT}/hos/grade`,
    getHospitalRegionApi: `${BASE_URL_XYT}/hos/region`,
    getHospitalDetailApi: `${BASE_URL_XYT}/hos/detail`,
    getHospitalDepartmentApi: `${BASE_URL_XYT}/hos/department`,
    getHospitalSchedulerApi: `${BASE_URL_XYT}/hos/scheduler`,
    getRegisterDoctorApi: `${BASE_URL_XYT}/hos/register/doctor`,

    // order
    addOrderApi: `${BASE_URL_XYT}/hos/add/order`,
    getOrderApi: `${BASE_URL_XYT}/hos/order`,
    cancelOrderApi: `${BASE_URL_XYT}/hos/cancel/order`,
    getPayQrCodeApi: `${BASE_URL_XYT}/hos/pay/wechat/qrcode`,
    getPayResultApi: `${BASE_URL_XYT}/hos/pay/result`,

    // user
    getPhoneCodeApi: `${BASE_URL_XYT}/user/phone/code`,
    loginWithPhoneApi: `${BASE_URL_XYT}/user/login/phone`,
    getWechatLoginParamApi: `${BASE_URL_XYT}/user/login/wechat/param`,
    getUserInfoApi: `${BASE_URL_XYT}/user/info`,
    certificationApi: `${BASE_URL_XYT}/user/certification`,

    getPatientsApi: `${BASE_URL_XYT}/user/patient/list`,
    getOrderStatesApi: `${BASE_URL_XYT}/user/order/states`,
    getOrderListApi: `${BASE_URL_XYT}/user/order/list`,
    
    addPatientApi: `${BASE_URL_XYT}/user/add/patient`,
    updatePatientApi: `${BASE_URL_XYT}/user/update/patient`,
    deletePatientApi: `${BASE_URL_XYT}/user/delete/patient`,

    // city
    getCascaderCityApi: `${BASE_URL_XYT}/city/cascader`,
}