<template>
    <div class="search">
        <el-autocomplete
            clearable
            placeholder="请输入医院名称"
        />
        <el-button type="primary" :icon="Search"></el-button>
    </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.search {
    width: 60%;
    height: 50px;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    :deep(.el-input__wrapper) {
        margin-right: 10px;
    }
}
</style>