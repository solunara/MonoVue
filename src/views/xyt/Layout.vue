<!-- layouts/ProjectLayout.vue -->
<template>
    <div class="layout">
        <!-- 全局顶部组件 -->
        <HospitalTop />
        <!-- 子页面会渲染在这里 -->
        <div class="content">
            <router-view v-slot="{ Component = null }">
                <transition name="fade-slide" mode="out-in">
                    <component v-if="Component" :is="Component" />
                </transition>
            </router-view>
        </div>
        <!-- 登录组件 -->
        <Login v-if="userStore.loginVisiabe"/>
        <!-- 全局底部组件 -->
        <HospitalBottom />
    </div>
</template>

<script setup>
import HospitalTop from '@/components/xyt/HospitalTop.vue'
import HospitalBottom from '@/components/xyt/HospitalBottom.vue'
import Login from '@/views/xyt/login/Login.vue'
import {useUserStore} from '@/store/xyt/user'
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .content{
        flex: 1;
    }
}
</style>