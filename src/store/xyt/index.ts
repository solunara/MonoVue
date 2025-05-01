import { defineStore } from 'pinia';
import {getHospitalByUid} from '@/api/xyt/hospital/index'
import type {HospitalType,RespHospitalDetailType} from '@/api/xyt/type'
export const useHosDetailStore = defineStore('HosDetail', {
    state: ()=>{
        return {
            hospitalDetail: ({} as HospitalType)
        }
    },
    getters: {
        getHospitalDetail: state => state.hospitalDetail 
    },
    actions: {
        async getHospitalUid(uid:string){
            console.log("get:", uid);
            let result:RespHospitalDetailType = await getHospitalByUid(uid)
            if(result.code === 200){
                this.hospitalDetail=result.data;
            }
            console.log(this.hospitalDetail);
        }
    }
})