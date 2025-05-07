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
                    <Visitor 
                        v-for="(item, index) in patientList" 
                        :key="item.patientId" 
                        :user="item" 
                        :index="index" 
                        :currentIndex="currentIndex"
                         @click="changeIndex(index)"
                    />
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
                    {{ registerDoctor?.workDay }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        就诊医院:
                        </div>
                    </template>
                    {{ registerDoctor?.hosName }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        就诊科室:
                        </div>
                    </template>
                    {{ registerDoctor?.deptName }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        医生姓名:
                        </div>
                    </template>
                    {{ registerDoctor?.doctorName }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        医生职称:
                        </div>
                    </template>
                    {{ registerDoctor?.rank }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        医生专长:
                        </div>
                    </template>
                    {{ registerDoctor?.profile }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        医事服务费:
                        </div>
                    </template>
                    <span style="color:red;">{{ registerDoctor?.amount }}元</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <!-- 确认挂号按钮 -->
        <div class="btn">
            <el-button type="primary" size="default" :disabled="currentIndex == -1 ? true : false">
                确认挂号
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {User} from "@element-plus/icons-vue"
import Visitor from '@/views/xyt/hospital/Visitor.vue'
import { ref, onMounted } from "vue";
import {getPatientData,getRegisterDoctor} from '@/api/xyt/hospital/index'
import type {Patient,ResponsePatientsData,RegisterDoctor,ResponseRegisterDoctorData} from '@/api/xyt/type'
import { useUserStore } from '@/store/xyt/user'
import { useRoute } from 'vue-router'
import { ElMessage } from "element-plus";

const $route = useRoute();

let userInfo = useUserStore();
let patientList = ref<Patient[]>([])
let registerDoctor=ref<RegisterDoctor>()
//存储用户确定就诊人索引值
let currentIndex = ref<number>(-1);

onMounted(()=>{
    // 获取就诊人信息
    getPatientList()
    // 获取医生信息
    getDoctorDetail()
})

const getPatientList = async ()=>{
    let result:ResponsePatientsData = await getPatientData(userInfo.userInfo.userId);
    if(result.code==200){
        patientList.value=result.data
    }else{
        ElMessage({
            type: 'error',
            message: (result.msg),
        });
    }
}

const getDoctorDetail = async ()=>{
    let result:ResponseRegisterDoctorData = await getRegisterDoctor(($route.query.hosId) as string, ($route.query.docId) as string, ($route.query.workDay) as string);
    if(result.code==200){
        registerDoctor.value=result.data
    }else{
        ElMessage({
            type: 'error',
            message: (result.msg),
        });
    }
}

//点击就诊人子组件的的回调
const changeIndex = (index: number) => {
  //存储当前用户选中就诊人信息索引值
  currentIndex.value = index;
};
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
                width: 25%;
                margin: 10px;
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