<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级:</div>
            <ul class="hospital_level">
                <li :class="{active:activedGradeFlag=='' }" @click="changeGrade('')">全部</li>
                <li v-for="item in hospitalGradeList" :class="{active:activedGradeFlag==item.grade_code}" :key="item.id" @click="changeGrade(item.grade_code)">{{ item.grade_name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {getHospitalGrade} from '@/api/xyt/home/index'
import type {HospitalGradeType,ResponseHospitalGrade} from '@/api/xyt/type'

// 医院等级列表数据
let hospitalGradeList = ref<HospitalGradeType[]>()
// 医院等级选中控制
let activedGradeFlag = ref<string>('')

let $emit = defineEmits(['getGradeCode'])

onMounted(async ()=>{
    getHospitalGradeData()
})

const getHospitalGradeData = async ()=>{
    let result:ResponseHospitalGrade = await getHospitalGrade();
    if(result.code==200){
        hospitalGradeList.value=result.data.reverse()
    }
}

const changeGrade = (gradeCode:string)=>{
    activedGradeFlag.value = gradeCode
    $emit('getGradeCode', gradeCode)
}


</script>

<style scoped lang="scss">
.level {
    color: #7f7f7f;
    margin-top: 20px;
    h1 {
        font-weight: 900;
        margin: 10px 0px;
    }
    .content {
        display: flex;
        .left {
            margin-right: 10px;
            width: 50px;
        }
        .hospital_level {
            display: flex;
            gap: 16px;
            li {
                margin-right: 10px;
                &.active {
                    color: #55a6fe;
                }
            }
            li:hover {
                color: #55a6fe;
                cursor: pointer;
            }
            
        }
    }
}
</style>