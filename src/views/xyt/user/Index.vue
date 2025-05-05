<template>
    <div class="user">
        <div class="usermenu">
            <div class="top">
                <el-icon><HomeFilled /></el-icon>
                <span>会员中心</span>
            </div>
            <el-menu
                :default-active=" $route.path"
                class="el-menu-vertical-demo"
            >
                <el-menu-item index="/xyt/xytuser/certification" @click="goTo('/xyt/xytuser/certification', { uid: (($route.query.uid ?? '') as string) })">
                    <el-icon><Document /></el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/xyt/xytuser/order" @click="goTo('/xyt/xytuser/order', { uid: (($route.query.uid ?? '') as string) })">
                    <el-icon><Setting /></el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/xyt/xytuser/patient" @click="goTo('/xyt/xytuser/patient', { uid: (($route.query.uid ?? '') as string) })">
                    <el-icon><icon-menu /></el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/xyt/xytuser/profile" @click="goTo('/xyt/xytuser/profile', { uid: (($route.query.uid ?? '') as string) })">
                    <el-icon><InfoFilled /></el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/xyt/xytuser/feedback" @click="goTo('/xyt/xytuser/feedback', { uid: (($route.query.uid ?? '') as string) })">
                    <el-icon><InfoFilled /></el-icon>
                    <span>意见反馈</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { InfoFilled, Menu as IconMenu, Document, Setting, HomeFilled} from '@element-plus/icons-vue'

const $route = useRoute();
const $router = useRouter();

const goTo = (path:string, query?: Record<string, string>)=>{
    $router.push({ path, query })
}
</script>

<style scoped lang="scss">
.user{
    width: 80%;
    height: 100%;
    display: flex;
    margin: 0 auto;

    .top {
        color: #7f7f7f;
        span {
            margin-left: 5px;
        }
    }
    
    .usermenu {
        flex: 2;
        flex-direction: column;
        align-items: center;
    }

    .content {
        flex: 8;
    }
}
</style>