<template>
    <div class="loginDialog">
        <el-dialog 
            v-model="userStore.getLoginVisiabe" 
            title="用户登录" 
            width="800px" 
            height="800px"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
        >
        <el-row style="margin: 20px 0;">
            <el-col :span="12">
                <div class="phone" v-show="scene==0">
                    <!-- 手机号登录 -->
                    <el-form>
                        <el-form-item>
                            <el-input placeholder="请输入手机号" :prefix-icon="User" v-model="formValue.phone"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="请输入验证码" :prefix-icon="Lock" v-model="formValue.code"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button :disabled="!isPhone || countdownFlag">
                                <Countdown v-if="countdownFlag" :flag="countdownFlag" @getFlag="getFlag"/>
                                <span v-else  @click="getPhoneMessageCode(formValue.phone)">获取验证码</span>
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" style="width: 100%;" :disabled="!isPhone || !isCode" @click="loginWithCode">用户登陆</el-button>
                    <div class="userlogin" @click="changeScene">
                        <span>微信扫码登录</span>
                        <svg t="1746149717178" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7341" width="32" height="32"><path d="M0 0m184.32 0l655.36 0q184.32 0 184.32 184.32l0 655.36q0 184.32-184.32 184.32l-655.36 0q-184.32 0-184.32-184.32l0-655.36q0-184.32 184.32-184.32Z" fill="#65DB79" p-id="7342"></path><path d="M663.21408 407.02976c-128.75776 0-233.13408 87.296-233.13408 194.97984s104.37632 194.97984 233.13408 194.97984a273.85856 273.85856 0 0 0 88.79104-14.76608l66.74432 35.55328-8.98048-64.12288a183.78752 183.78752 0 0 0 86.5792-151.64416c-0.01024-107.68384-104.38656-194.97984-233.13408-194.97984z" fill="#FFFFFF" p-id="7343"></path><path d="M404.48 194.56c137.0112 0 250.28608 83.968 276.16256 195.2768-48.82432-4.01408-302.08 23.27552-261.85728 271.36-36.4032 0.1024-86.016-1.49504-121.5488-13.4656l-80.62976 42.97728 10.8544-77.45536C164.7104 571.7504 122.88 505.00608 122.88 430.08c0-130.048 126.07488-235.52 281.6-235.52z" fill="#FFFFFF" p-id="7344"></path><path d="M313.344 352.256m-36.864 0a36.864 36.864 0 1 0 73.728 0 36.864 36.864 0 1 0-73.728 0Z" fill="#65DB79" p-id="7345"></path><path d="M497.664 352.256m-36.864 0a36.864 36.864 0 1 0 73.728 0 36.864 36.864 0 1 0-73.728 0Z" fill="#65DB79" p-id="7346"></path><path d="M585.728 544.768m-32.768 0a32.768 32.768 0 1 0 65.536 0 32.768 32.768 0 1 0-65.536 0Z" fill="#65DB79" p-id="7347"></path><path d="M741.376 544.768m-32.768 0a32.768 32.768 0 1 0 65.536 0 32.768 32.768 0 1 0-65.536 0Z" fill="#65DB79" p-id="7348"></path></svg>
                    </div>
                </div>
                <!-- 微信扫码登录 -->
                <div class="webchat" v-show="scene == 1">
                    <p>微信扫码登录页面</p>
                    <div class="userlogin" @click="changeScene">
                        <span>手机验证码登录</span>
                        <svg t="1746152837240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17295" width="24" height="24"><path d="M768 0a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h512z m0 64H256a64 64 0 0 0-63.552 56.512L192 128v768a64 64 0 0 0 56.512 63.552L256 960h512a64 64 0 0 0 63.552-56.512L832 896V128a64 64 0 0 0-64-64zM512 768a64 64 0 1 1 0 128 64 64 0 0 1 0-128z" fill="#1afa29" p-id="17296"></path></svg>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="right">
                    <div class="righttop">
                        <div class="item">
                            <img src="@/assets/imgs/xyt/code_login_wechat.png" alt="">
                            <svg t="1746150579951" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7711" width="24" height="24"><path d="M661.46 430.56c3.44 0 6.86 0.08 10.27 0.2-21.68-99.27-123.99-174.43-246.96-174.43-138.74 0-251.21 95.68-251.21 213.71 0 68.96 38.4 130.28 97.99 169.35l-25.1 74.03 83.11-45.57c29.36 10.24 61.5 15.9 95.2 15.9 6.5 0 12.93-0.21 19.31-0.62-7.03-18.62-10.84-38.46-10.84-59.06 0.01-106.87 102.19-193.51 228.23-193.51z m-150-68.58c20.49 0 37.1 16.61 37.1 37.1 0 20.49-16.61 37.1-37.1 37.1s-37.1-16.61-37.1-37.1c0.01-20.49 16.62-37.1 37.1-37.1z m-172.58 74.2c-20.49 0-37.1-16.61-37.1-37.1 0-20.49 16.61-37.1 37.1-37.1 20.49 0 37.1 16.61 37.1 37.1 0 20.49-16.61 37.1-37.1 37.1z" fill="#515151" p-id="7712"></path><path d="M873.56 624.08c0-99.32-94.96-179.84-212.1-179.84s-212.1 80.52-212.1 179.84 94.96 179.84 212.1 179.84c24.6 0 48.21-3.56 70.17-10.09l72.52 39.77-21.08-62.17c54.72-32.53 90.49-86.4 90.49-147.35zM595.2 598.27c-16.4 0-29.7-13.3-29.7-29.7s13.3-29.7 29.7-29.7 29.7 13.3 29.7 29.7-13.3 29.7-29.7 29.7z m138.18 0c-16.4 0-29.7-13.3-29.7-29.7s13.3-29.7 29.7-29.7 29.7 13.3 29.7 29.7-13.3 29.7-29.7 29.7z" fill="#515151" p-id="7713"></path></svg>
                            <p>微信扫一扫关注</p>
                            <p>"快速预约挂号"</p>
                        </div>
                        <div class="item">
                            <img src="@/assets/imgs/xyt/code_app.png" alt="">
                            <svg t="1746150771083" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10717" width="24" height="24"><path d="M230.4 48.64a28.16 28.16 0 0 0-28.16 28.16v870.4a28.16 28.16 0 0 0 28.16 28.16h563.2a28.16 28.16 0 0 0 28.16-28.16V76.8a28.16 28.16 0 0 0-28.16-28.16H230.4z m0-46.08h563.2c41.00096 0 74.24 33.23904 74.24 74.24v870.4c0 41.00096-33.23904 74.24-74.24 74.24H230.4c-41.00096 0-74.24-33.23904-74.24-74.24V76.8C156.16 35.79904 189.39904 2.56 230.4 2.56zM512 901.12c-28.27776 0-51.2-22.92224-51.2-51.2s22.92224-51.2 51.2-51.2 51.2 22.92224 51.2 51.2-22.92224 51.2-51.2 51.2z" fill="#000000" p-id="10718"></path></svg>
                            <p>扫一扫下载</p>
                            <p>"预约挂号"APP</p>
                        </div>
                    </div>
                </div>
                <p class="tip">小医通官方指定平台</p>
                <p class="tip">快速挂号 安全放心</p>
            </el-col>
        </el-row>
        <template #footer>
            <div>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
            </div>
        </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import {useUserStore} from '@/store/xyt/user'
import { User,Lock, Phone } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import type {ResponsePhoneCode,RequestLoginByPhone,ResponseLoginType} from '@/api/xyt/type'
import {getPhoneCode,loginByPhoneCode} from '@/api/xyt/user/user'
import Countdown from '@/components/xyt/Countdown.vue'
import { SET_XYT_TOKEN } from '@/utils/token'
let scene = ref<number>(0)
let userStore = useUserStore();
let formValue = reactive({
    phone: '',
    code: '',
}) 

let isPhone = computed(()=>{
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[13589])\d{1}))\d{7}$/;
    //返回布尔值:真代表手机号码、假代表的即为不是手机号码
    return reg.test(formValue.phone);
})

let isCode = computed(()=>{
    if (formValue.code.length===6){
         return !isNaN(Number(formValue.code));
    }
    return false;
})

let countdownFlag = ref<boolean>(false)

const closeDialog = ()=>{
    userStore.changeLoginVisiabe();
}

const changeScene = ()=>{
    if (scene.value == 0){
        scene.value = 1
    }else{
        scene.value = 0
    }
}

const getPhoneMessageCode = async (phone:string)=>{
    if(formValue.phone == '' || !isPhone){
        return
    }
    if(countdownFlag.value){
        return
    }
    
    let result:ResponsePhoneCode = await getPhoneCode(phone);
    if(result.code==200){
        countdownFlag.value=true;
        ElMessage({
            type: 'success',
            message: ('您的验证码：' + result.data + '   有效期1分钟'),
        });
    }else{
        ElMessage({
            type: 'error',
            message: ('出错了：' + result.msg),
        });
    }
}

const getFlag = (value:boolean)=>{
    countdownFlag.value = value
}

const loginWithCode = async ()=>{
    let data=<RequestLoginByPhone>{
        phone:formValue.phone,
        code: formValue.code
    }
    let result:ResponseLoginType = await loginByPhoneCode(data)
    if (result.code===200){
        SET_XYT_TOKEN(JSON.stringify(result.data))
        userStore.changeLoginVisiabe();
        ElMessage({
            type: 'success',
            message: ('登陆成功'),
        });
    }else{
        ElMessage({
            type: 'error',
            message: ('出错了：' + result.msg),
        });
    }
}
</script>

<style scoped lang="scss">
.loginDialog {
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    .phone{
        margin: 10px, 0, 10px, 0;
        padding: 20px;
        border: 1px solid #ccc;
        .userlogin{
            display: flex;
            font-size: 12px;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
        }
    }
    .webchat {
        .userlogin{
            display: flex;
            font-size: 12px;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
        }
    }
    .right {
        .righttop{
            display: flex;
            justify-content: space-around;
            .item {
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                    width: 130px;
                    height: 130px;
                }
                p {
                    margin: 5px 0px;
                }
            }
        } 
    }
    .tip {
        text-align: center;
        margin-top: 20px;
        font-size: 20px;
        font-weight: 900;
    }
}
</style>