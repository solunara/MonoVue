<template>
    <div class="xyt_top">
        <div class="content">
            <div class="left">
                <p>小医通 在线预约挂号平台</p>
            </div>
            <div class="right">
                <p class="help">帮助信息</p>
                <p class="login" @click="login" v-if="userStore.getUserInfa.name===''">登陆/注册</p>
                <el-dropdown class="login" v-else>
                    <span class="el-dropdown-link">
                        {{ userStore.getUserInfa.name }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="goTo('/xyt/xytuser/certification')">实名认证</el-dropdown-item>
                        <el-dropdown-item @click="goTo('/xyt/xytuser/order')">挂号订单</el-dropdown-item>
                        <el-dropdown-item @click="goTo('/xyt/xytuser/patient')">就诊人管理</el-dropdown-item>
                        <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import {useUserStore} from '@/store/xyt/user'
import { useRouter } from 'vue-router'
import type {UserInfoType} from '@/api/xyt/type'

const $router = useRouter()
let userStore = useUserStore();

const login=()=>{
    userStore.loginVisiabe=true;
}

const logout = ()=>{
    userStore.setUserInfo(<UserInfoType>{name:'', token:''})
    $router.push({
        path: '/xyt/xythome',
    })
}

const goTo = (path:string, query?: Record<string, string>)=>{
    $router.push({ path, query })
}
</script>

<style scoped lang="scss">
.xyt_top {
    width: 100%;
    height: 70px;
    background: #fff;
    display: flex;
    justify-content: center;
    .content {
        width: 80%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        .left{
            display: flex;
            justify-content: center;
            align-items: center;
            p {
                font-size: 20px;
                color: #55a6fe;
            }
        }
        .right{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #bbb;
            line-height: 30px;
            .login {
                margin-left: 10px;
            }
        }
    }
}
</style>