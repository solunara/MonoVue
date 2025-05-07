<template>
    <div>
        <div v-if="true">
            <OrderDetail />
        </div>
        <div v-else>
            <OrderAll />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
//引入子组件
import OrderDetail from "./OrderDetail.vue";
import OrderAll from "./OrderAll.vue";
//获取路由对象
let $route = useRoute();
</script>

<style scoped>

</style>