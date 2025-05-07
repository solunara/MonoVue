<template>
    <div>
        <div class="info">
            <h1>{{ hosDetail.hospitalDetail?.short_name }}停诊信息</h1>
            <el-empty description="暂无信息" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {useHosDetailStore} from '@/store/xyt/index'

let hosDetail = useHosDetailStore();
</script>

<style scoped lang="scss">
.info {
    h1 {
        text-align: center;
        font-size: 30px;
    }
}
</style>