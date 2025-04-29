<script setup lang="ts">

</script>

<template>
<router-view v-slot="{ Component = null }">
    <transition name="fade-slide" mode="out-in">
        <component v-if="Component" :is="Component" />
    </transition>
</router-view>
</template>

<style scoped>
/* 页面切换动画 */
.fade-slide-enter-active, .fade-slide-leave-active {
    transition: all 0.5s ease;
}
.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(50px);
}
.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-50px);
}

body, html, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background: #0d0d0d;
}
</style>
