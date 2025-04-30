// 首页模块ts类型

// 通用接口
export interface ResponseData {
    code: number,
    msg: string
}

// 医院数据类型
export interface HospitalType {
    uid:string,
    full_name:string,
    short_name:string,
    type_code:string,
    type_name:string,
    grade_code:string,
    grade_name:string,
    economic_type_code:string,
    economic_type_name:string,
    province_code:string,
    province_name:string,
    city_code:string,
    city_name:string,
    district_code:string,
    district_name:string,
    address:string,
    telephone:string,
    website_url:string,
    legal_representative:string,
    org_code:string,
    license_number:string,
    logo_url:string,
    longitude:number,
    latitude:number,
    license_expiry:string,
    established_at:string,
    created_at:number,
    updated_at:number,
    is_medical_insurance:boolean,
    is_active:boolean,
}

// 接口返回的医院数据列表类型
export interface HospitalListType extends ResponseData{
    data: {
        list: HospitalType[],
        total: number,
    }
}