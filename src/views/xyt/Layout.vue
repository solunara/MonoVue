<!-- layouts/ProjectLayout.vue -->
<template>
    <div>
        <HospitalTop /> <!-- 全局组件 -->
        <router-view /> <!-- 子页面会渲染在这里 -->
    </div>
</template>

<script setup>
import HospitalTop from '@/components/xyt/HospitalTop.vue'
</script>
  