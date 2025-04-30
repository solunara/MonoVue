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
            <el-row gutter="20">
                <el-col :span="20">
                    <!-- 等级子组件 -->
                    <HospitalLevel />
                    <!-- 地区子组件 -->
                    <HospitalRegion />
                    <!-- 医院信息子组件 -->
                    <div class="hostipalinfo">
                        <HospitalInfo class="item" v-for="item in 10" :key="item"/>
                    </div>
                    <!-- 医院信息分页 -->
                    <el-pagination
                        v-model:current-page="pageNo"
                        v-model:page-size="pageSize"
                        :page-sizes="[5, 10, 20, 30]"
                        :background="true"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="13"
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
import { ref } from 'vue'

// 分页器需要的数据
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
function handleSizeChange() {}
function handleCurrentChange() {}
</script>

<style scoped lang="scss">
.container {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content{
        width: 80%;
        height: 100vh;
    }
    .bottom{
        width: 80%;
        height: 50px;
        background: #ccc;
    }
    .hostipalinfo{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item{
            width: 48%;
            margin-bottom: 10px;
        }

    }
}
</style>