const BASE_URL_XYT = "http://4ffdd66e.r3.cpolar.cn/xyt"

export const API_CONFIG_XYT = {
    // hospital
    getHospitalApi: `${BASE_URL_XYT}/hos/list`,
    getHospitalGradeApi: `${BASE_URL_XYT}/hos/grade`,
    getHospitalRegionApi: `${BASE_URL_XYT}/hos/region`,
    getHospitalDetailApi: `${BASE_URL_XYT}/hos/detail`,
    getHospitalDepartmentApi: `${BASE_URL_XYT}/hos/department`,

    // user
    getPhoneCodeApi: `${BASE_URL_XYT}/user/phone/code`,
    loginWithPhoneApi: `${BASE_URL_XYT}/user/login/phone`,
}