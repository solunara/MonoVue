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
        <el-descriptions v-if="userInfo?.idNumber" class="margin-top" :column="1" style="margin: 20px auto" border>
            <el-descriptions-item label-align="center" :width="20">
                <template #label>
                    <div class="cell-item">
                    用户姓名:
                    </div>
                </template>
                {{ userInfo?.name }}
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
                {{ userInfo?.idNumber }}
            </el-descriptions-item>
        </el-descriptions>
        <!-- 未实名时展示 -->
        <el-form
            v-else
            ref="form"
            style="margin: 20px auto; width: 60%" 
            label-width="70"
            :model="params"
        >
            <el-form-item label="用户姓名">
                <el-input v-model="params.name" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select v-model="params.codeType" placeholder="请选择证件类型" style="width: 100%">
                    <el-option label="身份证" value="身份证"></el-option>
                    <el-option label="户口本" value="户口本"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码">
                <el-input  v-model="params.code" placeholder="请输入证件号码"></el-input>
            </el-form-item>
            <el-form-item label="上传证件">
                <el-upload
                    ref="upload"
                    :limit="1"
                    :file-list="fileList"
                    :auto-upload="false"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    :on-exceed="exceedCallback"
                    :on-preview="handlePreview"
                    accept="image/*"
                    list-type="picture-card"
                >
                    <img src="@/assets/imgs/xyt/auth_example.png" style="width: 100%; height: 100%" alt="">
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img
                        w-full
                        v-if="previewImage"
                        style="width: 100%; height: 100%"
                        :src="previewImage"
                        alt="Preview Image"
                    />
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="submit">提交</el-button>
                <el-button type="primary" size="default" @click="reset">清空</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { UploadFile } from 'element-plus'
import {ref,reactive, onMounted} from 'vue'
import { InfoFilled } from "@element-plus/icons-vue";
import type {UserParams,UserInfo,ResponseUserInfo,CertificationReslt} from '@/api/xyt/type'
import { reqUserInfo,reqUserCertation } from '@/api/xyt/user/user'

let form = ref();
let upload = ref();
const fileList = ref<UploadFile[]>([])

// 收集用户表单认证的数据
let params = reactive<UserParams>({
    name: "",
    code: "",
    codeType: "",
    image: "",
});

let userInfo = ref<UserInfo>()
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
/** 预览图像 */
const previewImage = ref<string>('')

//组件挂载完毕
onMounted(() => {
    //获取用户信息的方法
    getUserInfo();
});

//获取用户信息方法
const getUserInfo = async () => {
    let result: ResponseUserInfo = await reqUserInfo();
    if (result.code == 200) {
        userInfo.value = result.data;
    }
};

const exceedCallback = ()=>{
    ElMessage({
        type: "error",
        message: "只能上传一张图片",
    });
}

// 上传前处理：转成 base64
const handleChange: UploadProps['onChange'] = (file: UploadFile, files: UploadFiles) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    previewImage.value = event.target?.result as string;
    params.image = previewImage.value;
  };

  reader.onerror = (error) => {
    console.error('Error reading file:', error);
  };

  reader.readAsDataURL(file.raw!);
};

// 预览文件时的回调
const handlePreview = (file: UploadFile) => {
    previewImage.value = file.url || ''
    dialogVisible.value = true
}

//
const handleRemove = () => {
    params.certificatesVal = "";
    fileList.value = []
};

//重写按钮的回调
const reset = () => {
  //清空数据
  Object.assign(params, {
    certificatesNo: "",
    certificatesType: "",
    certificatesVal: "",
    name: "",
  });
  //清除文件上传列表
  upload.value.clearFiles();
};

//提交按钮的回调
const submit = async () => {
    //全部的表单校验通过返回一个成功的promise
    //如果有一个表单校验失败返回的是一个失败的promise对象,后面的语句就不在执行了
    //await form.value.validate();

    //认证成功
    let result:CertificationReslt =  await reqUserCertation(params);
    if (result.code == 200){
        //提示消息
        ElMessage({
            type: "success",
            message: "认证成功",
        });
        getUserInfo();
    }else{
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