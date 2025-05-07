<template>
    <div class="visitor">
        <div class="top">
            <div class="left">
                <span class="free">医保</span>
                <span class="username">{{ user.name }}</span>
            </div>
            <div class="right">
                <el-button type="primary" size="default" :icon="Edit" circle></el-button>
            </div>
        </div>
        <div class="bottom">
            <p>证件类型: 身份证</p>
            <p>证件号码: {{ user.idNumber }}</p>
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
import {Edit} from "@element-plus/icons-vue"

let props = defineProps(["user", "index", "currentIndex"])
</script>

<style scoped>
.visitor{
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    .top{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 60px;
        background: #e5e5e5;
        .left{
            .free{
                background: white;
                padding: 5px;
                font-size: 12px;
                margin-right: 5px;
                border-radius: 5px;
            }
            .username{
                color: #7f7f7f;
            }
        }
    }
    .bottom{
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