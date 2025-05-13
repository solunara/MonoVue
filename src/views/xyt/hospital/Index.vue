<template>
  <div class="hospital">
    <!-- 左侧菜单 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>医院详情信息</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/xyt/hospital/detail" @click="goTo('/xyt/hospital/detail')">
          <el-icon><Document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/xyt/hospital/notice" @click="goTo('/xyt/hospital/notice')">
          <el-icon><Setting /></el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item index="/xyt/hospital/register" @click="goTo('/xyt/hospital/register')">
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/xyt/hospital/suspension" @click="goTo('/xyt/hospital/suspension')">
          <el-icon><InfoFilled /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧内容 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled, Menu as IconMenu, Document, Setting, HomeFilled } from "@element-plus/icons-vue"
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useHosDetailStore } from "@/store/xyt/index"

let hosDetail = useHosDetailStore()
const $route = useRoute()
const $router = useRouter()

onMounted(() => {
  hosDetail.getHospitalDetail($route.query.hosId as string)
})

const goTo = (path: string) => {
  $router.push({ path, query: { hosId: $route.query.hosId } })
}
</script>

<style scoped lang="scss">
.hospital {
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
  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }

  .content {
    flex: 8;
    align-items: flex-start;
  }
}
</style>
