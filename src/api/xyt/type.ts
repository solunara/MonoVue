// 首页模块ts类型

// 通用接口
export interface ResponseData {
  code: number
  msg: string
}

// 医院数据类型
export interface HospitalType {
  uid: string
  full_name: string
  short_name: string
  type_code: string
  type_name: string
  grade_code: string
  grade_name: string
  economic_type_code: string
  economic_type_name: string
  province_code: string
  province_name: string
  city_code: string
  city_name: string
  district_code: string
  district_name: string
  address: string
  telephone: string
  website_url: string
  legal_representative: string
  org_code: string
  license_number: string
  logo_url: string
  longitude: number
  latitude: number
  license_expiry: string
  established_at: string
  created_at: number
  updated_at: number
  is_medical_insurance: boolean
  is_active: boolean
}

// 医院等级类型
export interface HospitalGradeType {
  id: number
  grade_code: string
  grade_name: string
}

// 医院地区类型
export interface HospitalRegionType {
  id: number
  name: string
  code: string
  city_name: string
  city_code: string
  province_name: string
  province_code: string
  category: number
  created_at: number
  updated_at: number
}

// 医院科室类型
export interface HospitalDepartment2 {
  uid: string
  name: string
  description: string
}

export interface HospitalDepartment1 {
  uid: string
  name: string
  description: string
  children: HospitalDepartment2[]
}

// 接口返回的医院分页数据列表类型
export interface HospitalListType extends ResponseData {
  data: {
    list: HospitalType[]
    total: number
  }
}

// 接口返回的医院详情类型
export interface RespHospitalDetailType extends ResponseData {
  data: HospitalType
}

// 接口返回的医院数据列表类型
export interface RespHospitalListType extends ResponseData {
  data: HospitalType[]
}

// 接口返回的医院等级列表类型
export interface ResponseHospitalGrade extends ResponseData {
  data: HospitalGradeType[]
}

// 接口返回的医院地区列表类型
export interface ResponseHospitalRegion extends ResponseData {
  data: HospitalRegionType[]
}

// 接口返回的医院科室列表类型
export interface ResponseHospitalDepartment extends ResponseData {
  data: HospitalDepartment1[]
}

// 接口返回的手机验证码类型
export interface ResponsePhoneCode extends ResponseData {
  data: string
}

// 验证码登录时的请求体类型
export interface RequestLoginByPhone {
  phone: string
  code: string
}

// 验证码登录时的请求体类型
export interface UserInfoType {
  name: string
  token: string
}

// 验证码登录时的请求体类型
export interface ResponseLoginType extends ResponseData {
  data: UserInfoType
}

//定义微信扫码登录返回的数据的ts类型
export interface WXLogin {
  redirectUri: string
  appid: string
  scope: string
  state: string
}

export interface WXLoginResponseData extends ResponseData {
  data: WXLogin
}

// 医生排班信息类型
export interface DocScheduler {
  docId: string
  scheId: string
  timeSlot: string
  doctorName: string
  rank: string
  profile: string
  workDay: string
  amount: number
  maxPatients: number
  registered: number
}

// 科室排班信息
export interface DeptScheduler {
  date: string
  weekday: number
  remain: number
  docScheduler: DocScheduler[]
}

// 科室排班信息
export interface ScheduleData {
  hosName: string
  fatherName: string
  name: string
  total: number
  deptSchedule: DeptScheduler[]
}

// 接口返回的科室排班信息
export interface ScheduleInfo extends ResponseData {
  data: ScheduleData
}

// 实名认证用户类型
export interface UserParams {
  name: string
  code: string
  codeType: string
  image: string
}

// 就诊人信息类型
// export interface Patient {
//     id:number,
// 	userId:string,
// 	patientId:string,
//     idNumber:string,
// 	name:string,
// 	birthday:string,
// 	phone:string,
// 	sex:boolean,
// }

// 接口返回的就诊人信息列表
export interface ResponsePatientsData extends ResponseData {
  data: Patient[]
}

// 挂号中医生信息类型
export interface RegisterDoctor {
  docId: string
  doctorName: string
  rank: string
  profile: string
  workDay: string
  hosName: string
  deptName: string
  amount: number
}

// 接口返回的挂号中医生信息类型
export interface ResponseRegisterDoctorData extends ResponseData {
  data: RegisterDoctor
}

// 挂号中医生信息类型
export interface OrderIdData {
  orderId: string
}

// 接口返回的确认挂号信息类型
export interface ResponseConfirmRegister extends ResponseData {
  data: OrderIdData
}

// 挂号中医生信息类型
export interface OrderData {
  id: number
  userId: string
  orderId: string
  scheId: string
  patientId: string
  hosID: string
  deptID: string
  docId: string
  hosName: string
  deptName: string
  docName: string
  patientName: string
  visitTime: string
  amount: number
  state: number
  registerTime: string
}

// 接口返回的挂号订单信息类型
export interface ResponseOrderinfo extends ResponseData {
  data: OrderData
}

// 接口返回的挂号订单列表类型
export interface ResponseOrderListType extends ResponseData {
  data: {
    list: OrderData[]
    total: number
  }
}

//获取二维码接口返回的数据ts类型
export interface PayInfo {
  codeUrl: string
  orderId: number
  totalFee: number
}

export interface QrCode extends ResponseData {
  data: PayInfo
}

//查询支付结果的ts数据类型
export interface PayReslt extends ResponseData {
  data: boolean
}

// 用户数据类型
export interface UserInfo {
  name: string
  email: string
  phone: string
  profile: string
  idNumber: string
  birthday: string
}

// 接口返回的用户数据类型
export interface ResponseUserInfo extends ResponseData {
  data: UserInfo
}

//实名认证结果的ts数据类型
export interface CertificationReslt extends ResponseData {
  data: any
}

// 挂号订单状态
export interface OrderStatus {
  id: number
  state: string
}
// 接口返回的挂号订单状态列表
export interface ResponseOrderStatus extends ResponseData {
  data: OrderStatus[]
}

//代表证件类型的数据ts
export interface CertationType {
  id: number
  name: string
}

//新增与修改已有的就诊人参数的数据ts类型
export interface Patient {
  id?: string
  name: string
  certificatesType: number
  certificatesNo: string
  sex: number
  birthdate: string
  phone: string
  isMarry: number
  isInsure: number
  addressSelected: string[]
  address: string
  contactsName: string
  contactsCertificatesType: number
  contactsCertificatesNo: string
  contactsPhone: string
}

// 级联城市信息
export interface CascaderCity {
  code: string
  name: string
  leaf: boolean
}
// 接口返回的级联城市信息
export interface ResponseCascaderCity extends ResponseData {
  data: CascaderCity[]
}
