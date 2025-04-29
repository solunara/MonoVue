<template>
    <el-carousel height="350px">
        <el-carousel-item v-for="item in 4" :key="item">
            <img src="@/assets/imgs/xyt/web-banner-1.png" alt="">
        </el-carousel-item>
    </el-carousel>
</template>

<script setup lang="ts">

</script>

<style scoped land="scss">
img {
    width: 100%;
    height: 350px;
}
</style>