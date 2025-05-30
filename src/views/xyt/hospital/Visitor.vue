<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <span class="free">{{ user.isInsure == 0 ? "医保" : "自费" }}</span>
        <span class="username">{{ user.name }}</span>
      </div>
      <div class="right">
        <el-button type="primary" size="default" :icon="Edit" @click="handler" circle></el-button>
        <el-popconfirm @confirm="removeUser" :title="`你确定要删除${user.name}`" width="200px">
          <template #reference>
            <el-button
              v-if="$route.path == '/xyt/xytuser/patient'"
              circle
              type="danger"
              size="default"
              :icon="Delete"
            ></el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型: {{ user.certificatesType == 0 ? "身份证" : "户口本" }}</p>
      <p>证件号码: {{ user.certificatesNo }}</p>
      <p>用户性别: {{ user.sex == 0 ? "女" : "男" }}</p>
      <p>出生日期: {{ user.birthday }}</p>
      <p>手机号码: {{ user.phone }}</p>
      <transition name="confirm">
        <div class="confirm" v-if="index === currentIndex">已选择</div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import { Edit, Delete } from "@element-plus/icons-vue"
import { useRoute, useRouter } from "vue-router"
import type { ResponseData } from "@/api/xyt/type"
import { deletePatient } from "@/api/xyt/hospital/index"

let $route = useRoute()
let $router = useRouter()

let props = defineProps(["user", "index", "currentIndex"])
let $emit = defineEmits(["changeScene", "removeUser"])

//相应就诊人组件修改按钮的回调
const handler = () => {
  //要么是就诊人管理模块点击修改按钮
  //要么预约挂号点击修改按钮
  if ($route.path == "/xyt/xytuser/patient") {
    $emit("changeScene", props.user)
  } else {
    //路由跳转携带参数
    $router.push({ path: "/xyt/xytuser/patient", query: { type: "edit", id: props.user.id } })
  }
}

//删除某一个用户
const removeUser = async () => {
  let result: ResponseData = await deletePatient(props.user.id)
  if (result.code == 200) {
    //消息提示
    ElMessage({
      type: "success",
      message: "删除成功"
    })
    $emit("removeUser")
  } else {
    ElMessage({
      type: "error",
      message: "删除失败"
    })
  }
}
</script>

<style scoped>
.visitor {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  .top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    background: #e5e5e5;
    .left {
      .free {
        background: white;
        padding: 5px;
        font-size: 12px;
        margin-right: 5px;
        border-radius: 5px;
      }
      .username {
        color: #7f7f7f;
      }
    }
  }
  .bottom {
    position: relative;
    padding: 10px;
    p {
      line-height: 30px;
    }
    .confirm {
      position: absolute;
      width: 150px;
      height: 150px;
      color: red;
      border-radius: 50%;
      border: 1px dashed red;
      text-align: center;
      line-height: 150px;
      left: 25%;
      top: 5%;
      opacity: 0.5;
      transform: rotate(35deg);
      font-weight: 900;
    }
    .confirm-enter-from {
      transform: scale(1);
    }

    .confirm-enter-active {
      transition: all 0.5s;
    }

    .confirm-enter-to {
      transform: scale(1.3);
    }
  }
}
</style>
