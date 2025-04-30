<template>
    <div class="container">
        <!-- 顶部全局组件 -->
        <HospitalTop />
        
        <!-- 中间内容 -->
        <div class="content">
            <!-- 轮播图 -->
            <Carousel />
            <!-- 搜索框 -->
            <SearchInput />
            <!-- 医院信息展示 -->
            <el-row :gutter="20">
                <el-col :span="20">
                    <!-- 等级子组件 -->
                    <HospitalLevel />
                    <!-- 地区子组件 -->
                    <HospitalRegion :cityName="cityName" />
                    <!-- 医院信息子组件 -->
                    <div class="hostipalinfo">
                        <HospitalInfo class="hositem" v-for="item in hospitalList" :key="item.uid" :hospitalInfo="item" />
                    </div>
                    <!-- 医院信息分页 -->
                    <el-pagination
                        v-model:current-page="pageNo"
                        v-model:page-size="pageSize"
                        :page-sizes="[5, 10, 20, 30]"
                        :background="true"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        style="margin-bottom: 10px;"
                    />
                </el-col>
                <el-col :span="4">
                    456
                </el-col>
            </el-row>
        </div>
        <!-- 底部全局组件 -->
        <div class="bottom">
            footer
        </div>
    </div>
</template>

<script setup lang="ts">
import HospitalTop from '@/components/xyt/HospitalTop.vue'
import Carousel from './home/Carousel.vue'
import SearchInput from './home/SearchInput.vue'
import HospitalLevel from './home/HospitalLevel.vue'
import HospitalRegion from './home/HospitalRegion.vue'
import HospitalInfo from './home/HospitalInfo.vue'
import { onMounted, ref } from 'vue'
import {getHospitalList} from '@/api/xyt/home/index'
import type {HospitalType,HospitalListType} from '@/api/xyt/type'

let cityName = ref<string>('北京')
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let totalPage = ref<number>(0)
let hospitalList = ref<HospitalType[]>()

let total = ref<number>(0)

onMounted(async ()=>{
    getHospitalData()
})

const getHospitalData = async ()=>{
    let result:HospitalListType = await getHospitalList(cityName.value, pageNo.value, pageSize.value);
    if(result.code==200){
        hospitalList.value=result.data.list
        total.value = result.data.total
        totalPage.value = Math.ceil(total.value / pageSize.value)
    }
    console.log(hospitalList.value);
}

function handleSizeChange() {
    getHospitalData()
}
function handleCurrentChange() {
    getHospitalData()
}

</script>

<style scoped lang="scss">
.container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content{
        width: 80%;
        flex: 1;
        .hostipalinfo {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            margin-bottom: 10px;
            justify-content: space-between;
            .hositem{
                width: 48%;
            }
        }
        @media screen and (max-width: 768px) {
            .hostipalinfo {
                .hositem {
                    width: 100%;
                }
            }
        }
    }
    .bottom{
        width: 80%;
        height: 70px;
        background: #ccc;
    }
}
</style>
