<template>
    <!-- 展示全部订单的结构 -->
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>挂号订单</span>
            </div>
        </template>
        <!--提供用户选择的下拉菜单-->
        <el-form :inline="true">
            <el-form-item label="就诊人">
                <el-select placeholder="请选择就诊人" v-model="patientId" @change="changeUser" style="width: 150px">
                    <el-option label="全部就诊人" value=""></el-option>
                    <el-option
                        v-for="item in allUser"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="changeOrderState" style="width: 150px">
                <el-option label="全部订单" value=""></el-option>
                <el-option v-for="(item,index) in allOrderState" :key="index" :label="item.state" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <!-- 表格展示订单的数据 -->
        <el-table border style="margin: 10px 0px" :data="allOrderArr">
            <el-table-column label="就诊时间" prop="visitTime"></el-table-column>
            <el-table-column label="医院" prop="hosName"></el-table-column>
            <el-table-column label="科室" prop="deptName"></el-table-column>
            <el-table-column label="医生" prop="docName"></el-table-column>
            <el-table-column label="服务费" prop="amount"></el-table-column>
            <el-table-column label="就诊人" prop="patientName"></el-table-column>
            <el-table-column label="订单状态">
                <template #default="{ row }">
                    {{ getState(row?.state) }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #="{ row }">
                    <el-button link @click="goDetail(row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @current-change="getOrderInfo"
            @size-change="handler"
        />
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type {
    Patient,
    ResponsePatientsData,
    ResponseOrderListType,
    OrderData,
    ResponseOrderStatus,
    OrderStatus,
} from "@/api/xyt/type";
import { getPatientData,reqOrderList,getOrderStates } from "@/api/xyt/hospital/index";
import { useRouter } from "vue-router";

//获取路由器对象
let $router = useRouter();

//当前分页器页码
let pageNo = ref<number>(1);
//当前页码展示几条数据
let pageSize = ref<number>(10);
//收集就诊人的ID
let patientId = ref<string>("");
//订单的状态
let orderStatus = ref<number>("");
//存储全部的订单
let allOrderArr = ref<OrderData[]>([]);
//存储订单的总个数
let total = ref<number>(0);
//存储全部就诊人的信息
let allUser = ref<Patient[]>([]);
//存储全部订单的状态
let allOrderState = ref<OrderStatus[]>([]);

//组件挂载完毕的钩子
onMounted(() => {
    //获取订单的方法
    getOrderInfo();
    //获取全部就诊人的信息以及获取全部的订单的状态
    getData();
});

//获取订单的方法
const getOrderInfo = async (pager: number = 1) => {
    pageNo.value = pager;
    let result: ResponseOrderListType = await reqOrderList(
        patientId.value,
        orderStatus.value,
        pageNo.value,
        pageSize.value,
    );
    if (result.code == 200) {
        allOrderArr.value = result.data.list;
        total.value = result.data.total;
    }
};

//详情按钮的回调
const goDetail = (row: OrderData) => {
    $router.push({ path: "/xyt/xytuser/order", query: { orderId: row.orderId } });
};

//下拉菜单事件的回调
const handler = (pageSizes: number) => {
    pageSize.value = pageSizes;
    getOrderInfo();
};

//获取就诊人与订单状态接口方法
const getData = async () => {
    //获取全部的就诊人信息
    const result: ResponsePatientsData = await getPatientData();
    if (result.code == 200){
        allUser.value = result.data;
    }

    //获取全部的订单状态
    const result1: ResponseOrderStatus = await getOrderStates();
    if (result.code == 200){
        allOrderState.value = result1.data;
    }
};

//就诊人下拉菜单回调方法
const changeUser = () => {
    //根据就诊人的ID再次获取挂号订单的数据
    getOrderInfo();
};

//订单状态下拉菜单回调
const changeOrderState = ()=>{
    getOrderInfo();
}

const getState = (st:number)=>{
    switch (st) {
        case 0:
            return '待支付';
        case 1:
            return '已支付';
        case 2:
            return '已完成';
        default:
            return '已取消';
    }
}
</script>

<style scoped>
</style>
  