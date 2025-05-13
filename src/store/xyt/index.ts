import { defineStore } from "pinia"
import { getHospitalByHosId, getHospitalDepartment } from "@/api/xyt/hospital/index"
import type {
  HospitalType,
  RespHospitalDetailType,
  HospitalDepartment1,
  ResponseHospitalDepartment
} from "@/api/xyt/type"
export const useHosDetailStore = defineStore("HosDetail", {
  state: () => {
    return {
      hospitalDetail: {} as HospitalType,
      departmentList: {} as HospitalDepartment1[]
    }
  },
  getters: {},
  actions: {
    async getHospitalDetail(hosId: string) {
      let result: RespHospitalDetailType = await getHospitalByHosId(hosId)
      if (result.code === 200) {
        this.hospitalDetail = result.data
      }
    },

    async getHospitalDepartment() {
      let result: ResponseHospitalDepartment = await getHospitalDepartment()
      if (result.code === 200) {
        this.departmentList = result.data
      }
    }
  }
})
