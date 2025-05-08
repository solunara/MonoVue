<template>
    <div>
        <!-- 展示订单详情的结构 -->
        <el-card class="box-card">
        <!-- 卡片头部的结构 -->
        <template #header>
            <div class="detail">挂号详情</div>
        </template>
        <!-- 展示身体部分顶部结构 -->
        <div class="top">
            <!-- 左侧标签 -->
            <el-tag class="ml-2" type="success" style="background: #5FB135;">
            <div class="tag">
                <svg t="1685933792381" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2389" width="24" height="24">
                    <path d="M392.533333 806.4L85.333333 503.466667l59.733334-59.733334 247.466666 247.466667L866.133333 213.333333l59.733334 59.733334L392.533333 806.4z" fill="#1afa29" p-id="2390"></path>
                </svg>
                <span>{{ getOrderState((orderInfo?.state) as number) }}</span>
            </div>
            </el-tag>
            <div class="right_info">
            <img src="@/assets/imgs/xyt/code_app.png" alt="" />
            <div class="info">
                <p>微信关注 "北京114预约挂号"</p>
                <p>"快速预约挂号"</p>
            </div>
            </div>
        </div>
        <!-- 订单详情底部的结构 -->
        <div class="bottom">
            <div class="left">
            <!-- 左侧展示订单详情信息 -->
            <el-descriptions class="margin-top" :column="1" border>
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">就诊人信息</div>
                </template>
                {{ orderInfo?.patientName }}
                </el-descriptions-item>
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">就诊日期</div>
                </template>
                {{ orderInfo?.visitTime }}
                </el-descriptions-item>
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">就诊医院</div>
                </template>
                {{ orderInfo?.hosName }}
                </el-descriptions-item>
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">就诊科室</div>
                </template>
                {{ orderInfo?.deptName }}
                </el-descriptions-item>
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">医生名字</div>
                </template>
                {{ orderInfo?.docName }}
                </el-descriptions-item>
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">医事服务费</div>
                </template>
                <span style="color: red">{{ orderInfo?.amount }}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">挂号单号</div>
                </template>
                {{ orderInfo?.orderId }}
                </el-descriptions-item>
                <el-descriptions-item>
                <template #label>
                    <div class="cell-item">挂号时间</div>
                </template>
                {{ orderInfo?.registerTime }}
                </el-descriptions-item>
            </el-descriptions>
            <div class="btn" v-if="orderInfo?.state != -1">
                <el-popconfirm title="确定取消预约吗?" @confirm="cancel">
                    <template #reference>
                        <el-button>取消预约</el-button>
                    </template>
                </el-popconfirm>
                <el-button
                    type="primary"
                    size="default"
                    v-if="orderInfo?.state == 0"
                    @click=""
                >支付</el-button>
            </div>
            </div>
            <div class="right">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>注意事项</span>
                        </div>
                    </template>
                    <p>1. 请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
                    <p style="color: red">
                    2.【取号】上午就诊的需在当日中午 12:00 前取号, 下午就诊的需在当日下午 18:00 前取号, 未取号可能导致无法就诊；
                    </p>
                    <p>
                    3.【退号】就诊当天 12:00 前可在线退号, 逾期将不可办理退号退费;
                    </p>
                    <p>
                    4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
                    </p>
                    <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                </el-card>
            </div>
        </div>
        </el-card>
        <!-- 展示支付二维码的结构 -->
        <!-- 对话框通过v-model控制显示与隐藏的 true:展示 false隐藏 -->
        <el-dialog @close="" v-model="dialogVisible" title="微信支付" width="400">
        <!-- 支付需要使用的二维码图片 -->
        <div class="qrocde">
            <img src="@/assets/imgs/xyt/wechat_payment_code.png" alt="" />
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
        </div>
        <!-- 对话框底部插槽传递结构 -->
        <template #footer>
            <el-button type="primary" size="default" @click="">关闭窗口</el-button>
        </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import type { OrderData, ResponseOrderinfo } from '@/api/xyt/type'
import { getOrder } from '@/api/xyt/hospital/index'
import { useRoute } from 'vue-router'
import { cancelOrder } from '@/api/xyt/hospital/index'

const $route = useRoute();
let orderInfo = ref<OrderData>();
//控制对话框显示与隐藏的数据
let dialogVisible = ref<boolean>(false);

//组件挂载完毕
onMounted(() => {
    getOrderInfo();
});

//获取订单详情的数据
const getOrderInfo = async () => {
    let result: ResponseOrderinfo = await getOrder($route.query.orderId as string);
    if (result.code == 200) {
        orderInfo.value = result.data;
    }
};

const getOrderState=(state:number)=>{
    console.log(state);
    
    switch (state) {
        case -1:
            return '订单已取消';
        case 1:
            return '支付成功'
        case 2:
            return '订单已完成';
        default:
            return '预约成功, 待支付';
    }
}

//取消订单   订单状态有三种 orderStatus  -1  取消预约  0 已预约但没有支付  1 支付成功 2 已完成
const cancel = async () => {
  try {
    //取消预约成功
    await cancelOrder($route.query.orderId as string);
    //再次获取订单详情的数据
    getOrderInfo();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "取消预约失败",
    });
  }
};
</script>

<style scoped lang="scss">
.box-card {
  .detail {
    color: #7f7f7f;
    font-weight: 900;
  }
  .top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .tag {
      display: flex;
      span {
        align-content: center;
        font-size: 18px;
        color: #F3F3F3;
        margin-left: 5px;
      }
    }
    .right_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      img {
        width: 60px;
        height: 60px;
      }
      .info {
        margin-left: 10px;
        p {
          font-size: 12px;
          line-height: 25px;
        }
      }
    }
  }

  .bottom {
    display: flex;
    margin-top: 20px;
    .left {
      flex: 4;
      .btn {
        margin: 10px 0px;
      }
    }
    .right {
      margin-left: 20px;
      flex: 6;
      p {
        line-height: 30px;
      }
    }
  }
}
</style>