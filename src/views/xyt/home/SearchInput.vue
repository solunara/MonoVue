<template>
  <div class="search">
    <el-autocomplete
      clearable
      placeholder="请输入医院名称进行查找"
      v-model="hosname"
      :fetch-suggestions="fetchData"
      :trigger-on-focus="false"
      @select="goHosDetail"
    />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { getHospitalListByName } from "@/api/xyt/home/index"
import type { RespHospitalListType } from "@/api/xyt/type"

const $router = useRouter()

let hosname = ref<string>("")

const fetchData = async (keyword: string, callback: any) => {
  hosname.value = keyword
  let result: RespHospitalListType = await getHospitalListByName(keyword)
  if (result.code == 200) {
    let showData = result.data.map(item => {
      return { value: item.full_name, hosId: item.uid }
    })
    callback(showData)
  }
}

const goHosDetail = (item: any) => {
  $router.push({
    path: "/xyt/hospital/detail",
    query: {
      hosId: item.hosId
    }
  })
}
</script>

<style scoped lang="scss">
.search {
  width: 60%;
  height: 50px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  :deep(.el-input__wrapper) {
    height: 45px;
  }
  :deep(.el-button) {
    height: 45px;
  }
}
</style>
