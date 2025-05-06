<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h3>实名信息</h3>
            </div>
        </template>
        <div class="tip" style="color: #7f7f7f">
            <el-icon><InfoFilled /></el-icon>
            <p>完成实名认证后才能添加就诊人，进行挂号服务。</p>
        </div>
        <!-- 实名后展示 -->
        <el-descriptions v-if="false" class="margin-top" :column="1" style="margin: 20px auto" border>
            <el-descriptions-item label-align="center" :width="20">
                <template #label>
                    <div class="cell-item">
                    用户姓名:
                    </div>
                </template>
                xxx
            </el-descriptions-item>
            <el-descriptions-item label-align="center" :width="20">
                <template #label>
                    <div class="cell-item">
                    证件类型:
                    </div>
                </template>
                身份证
            </el-descriptions-item>
            <el-descriptions-item label-align="center" :width="20">
                <template #label>
                    <div class="cell-item">
                    证件号码:
                    </div>
                </template>
                xxx
            </el-descriptions-item>
        </el-descriptions>
        <!-- 未实名时展示 -->
        <el-form
            ref="form"
            style="margin: 20px auto; width: 60%" 
            label-width="70"
            v-model="params"
        >
            <el-form-item label="用户姓名">
                <el-input v-model="params.name" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select v-model="params.certificatesType" placeholder="请选择证件类型">
                    <el-option label="身份证"></el-option>
                    <el-option label="户口本"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码">
                <el-input  v-model="params.certificatesNo" placeholder="请输入证件号码"></el-input>
            </el-form-item>
            <el-form-item label="上传证件">
                <el-upload
                    ref="upload"
                    :limit="1"
                >
                    <img src="@/assets/imgs/xyt/auth_example.png" alt="">
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="submit">提交</el-button>
                <el-button type="primary" size="default" @click="reset">清空</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import { InfoFilled } from "@element-plus/icons-vue";
import type {UserParams} from '@/api/xyt/type'

let form = ref();
let upload = ref();

// 收集用户表单认证的数据
let params = reactive<UserParams>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: "",
});

const exceedCallback = ()=>{
    
}
const successCallback = ()=>{
    console.log();
}

//重写按钮的回调
const reset = () => {
  //清空数据
  Object.assign(params, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: "",
  });
  //清除文件上传列表
  upload.value.clearFiles();
};

//提交按钮的回调
const submit = async () => {
  //全部的表单校验通过返回一个成功的promise
  //如果有一个表单校验失败返回的是一个失败的promise对象,后面的语句就不在执行了
  await form.value.validate();
  try {
    //认证成功
    await reqUserCertation(params);
    //提示消息
    ElMessage({
      type: "success",
      message: "认证成功",
    });
    //认证成功以后再次获取用户信息
    getUserInfo();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "认证失败",
    });
  }
};
</script>

<style scoped lang="scss">
.box-card {
    .tip {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>