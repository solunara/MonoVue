<template>
    <div class="region">
        <div class="content">
            <div class="left">地区:</div>
            <ul class="hospital_region">
                <li :class="{active:activedRegionFlag==0 }"  @click="changeRegion(0, '')">全部</li>
                <li v-for="item in hospitalRegionList" :key="item.id" :class="{active:activedRegionFlag==item.id }"  @click="changeRegion(item.id, item.district_code)">{{ item.district_name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue'
import {getHospitalRegion} from '@/api/xyt/home/index'
import type {HospitalRegionType,ResponseHospitalRegion} from '@/api/xyt/type'

// 医院地区列表数据
let hospitalRegionList = ref<HospitalRegionType[]>()
// 医院地区选中控制
let activedRegionFlag = ref<number>(0)

let $emit = defineEmits(['getDistrictCode'])

// 定义接收的 props 类型
const props = defineProps<{
    cityName: string
}>()

onMounted(async ()=>{
    getHospitalRegionData()
})

const getHospitalRegionData = async ()=>{
    let result:ResponseHospitalRegion = await getHospitalRegion(props.cityName);
    if(result.code==200){
        hospitalRegionList.value=result.data
    }
}

const changeRegion = (regionId:number, regionCode:string)=>{
    activedRegionFlag.value = regionId
    $emit('getDistrictCode', regionCode)
}
</script>

<style scoped lang="scss">
.region {
    color: #7f7f7f;
    margin-top: 20px;
    margin-bottom: 20px;

    .content {
        display: grid;
        grid-template-columns: 50px 1fr; // 左 50px，右自适应
        align-items: start;

        .left {
            grid-column: 1;
            margin-right: 10px;
        }

        ul {
            grid-column: 2;
            display: flex;
            flex-wrap: wrap;
            gap: 16px;

            li {
            margin-bottom: 10px;
            &.active {
                color: #55a6fe;
            }
            &:hover {
                color: #55a6fe;
                cursor: pointer;
            }
            }
        }
    }
}
</style>