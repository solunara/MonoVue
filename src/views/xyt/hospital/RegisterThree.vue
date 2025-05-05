<template>
    <div class="container">
        <p class="tip">确认挂号信息</p>
        <!-- 展示就诊人信息 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人</span>
                    <el-button class="visitor" type="primary" size="default" :icon="User">添加就诊人</el-button>
                </div>
            </template>
            <!-- 展示就诊人信息 -->
                <div class="user">
                <Visitor v-for="item in 4" :key="item" />
                </div>
        </el-card>
        <!-- 展示医生信息 -->
        <el-card>
            <!-- 头部 -->
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <!-- 身体 -->
            <el-descriptions
                class="margin-top"
                :column="2"
                border
            >
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        就诊日期:
                        </div>
                    </template>
                    xxxx年xx月xx日
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        就诊医院:
                        </div>
                    </template>
                    xxxx医院
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        就诊科室:
                        </div>
                    </template>
                    xxxx科室
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        医生姓名:
                        </div>
                    </template>
                    xxxx医生
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        医生职称:
                        </div>
                    </template>
                    xxxx
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        医生专长:
                        </div>
                    </template>
                    xxxx
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        医事服务费:
                        </div>
                    </template>
                    <span style="color:red;">100元</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <!-- 确认挂号按钮 -->
        <div class="btn">
            <el-button type="primary" size="default">
                确认挂号
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {User} from "@element-plus/icons-vue"
import Visitor from '@/views/xyt/hospital/Visitor.vue'

</script>

<style scoped lang="scss">
.container{
    .tip{
        font-weight: 600;
        color: #7f7f7f;
        font-size: 18px;
    }
    .box-card{
        margin: 20px 0;
        .card-header{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .user{
            display: flex;
            flex-wrap: wrap;
            .visitor{
                width: 30%;
                margin: 5px;
            }
        }
    }
    .btn{
        display: flex;
        justify-content: center;
        margin: 10px 0;
    }
}

</style>