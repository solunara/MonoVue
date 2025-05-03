<template>
    <div class="wrap">
        <!-- 顶部结构 -->
        <div class="top">
            <div class="hosname">
                xxx医院
            </div>
            <div class="line"> | </div>
            <div class="department">xx科室</div>
            <div class="dot">·</div>
            <div class="department2">心血管内科门诊</div>
        </div>
        <!-- 中间结构 -->
        <div class="center">
            <p class="date">2023年6月3日</p>
            <div class="container">
                <div class="item" v-for="ele in 6" :key="ele">
                    <div class="header">123</div>
                    <div class="bottom">456</div>
                </div>
            </div>
            <!-- 分页器 -->
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 30]"
                :background="true"
                :total="total"
                layout="prev, pager, next"
            />
        </div>
        
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
let pageNo = ref<number>(1)
let pageSize = ref<number>(6)
let total = ref<number>(10)
</script>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;
    .line {
      width: 5px;
      height: 20px;
      margin: 0px 5px;
    }
    .dot {
      margin: 0px 5px;
      font-weight: 500;
    }
  }
  .center{
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .container{
        width: 100%;
        display: flex;
        margin: 30px 0px;
        .item{
            flex: 1;
            border: 1px solid skyblue;
            margin: 0px 10px;
            transition: all 0.3s;
            .header{
                background: #e8f2ff;
                height: 30px;
                width: 100%;
                text-align: center;
                line-height: 30px;
            }
            .bottom{
                width: 100%;
                height: 60px;
                text-align: center;
                line-height: 60px;
            }
        }
    }
  }
}
</style>