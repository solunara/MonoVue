<template>
    <div class="wrap">
        <!-- 顶部结构 -->
        <div class="top">
            <div class="hosname">
                {{ hosName }}
            </div>
            <div class="line"> | </div>
            <div class="department">{{ fatherName }}</div>
            <div class="dot">·</div>
            <div class="department2">{{ deptName }}</div>
        </div>
        <!-- 中间结构 -->
        <div class="center">
            <div class="container">
                <div class="item"  v-for="ele in deptSchedulerData" :key="ele.date" :class="{active: (hasReached3PM()  && isToday(ele.date)) || ele.remain==0}" @click="changeTime(ele.docScheduler)">
                    <div class="header">{{ ele.date }} {{ formatWeek(ele.weekday) }}</div>
                    <div class="bottom">
                        <div class="itemstatus" v-if="(hasReached3PM()  && isToday(ele.date))">
                            停止挂号
                        </div>
                        <!-- <div class="itemstatus" v-else-if="isAfter7DaysFromTodayStart(ele.workDate)==1">
                            即将放号
                        </div> -->
                        <div class="itemstatus" v-else-if="ele.remain>0">
                            剩余({{ ele.remain }})
                        </div>
                        <div class="itemstatus" v-else>
                            约满了
                        </div>
                    </div>
                </div>
            </div>
            <!-- 分页器 -->
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[6]"
                :background="true"
                :total="total"
                layout="prev, pager, next"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
        <!-- 展示医生 -->
         <div class="fotter">
            <!-- 展示即将放号的时间 -->
            <!-- <div class="will" v-if="isAfter7DaysFromTodayStart(workTime?.workDate as number)==1">
                <span class="willText">明天</span>
                <span class="time">12:00</span>
                <span class="willText">放号</span>
            </div> -->
            <!-- 展示医生的结构:上午、下午 -->
            <div class="doctor">
                <!-- 上午 -->
                <div class="moring">
                <!-- 顶部文字提示 -->
                <div class="tip">
                    <svg t="1685757781400" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1631" width="32" height="32">
                      <path d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z" fill="#1296db" p-id="1632"></path>
                    </svg>
                    <span class="text">上午号源</span>
                </div>
                <!--每一个医生的信息-->
                <div class="doc_info" v-for="doctor in moringArr" :key="doctor.docId" v-if="isSchedulerMorning">
                    <!-- 展示医生的名字|技能 -->
                    <div class="left">
                    <div class="info">
                        <span>{{ doctor.rank }}</span>
                        <span>|</span>
                        <span>{{ doctor.doctorName }}</span>
                    </div>
                    <div class="skill">{{ doctor.profile }}</div>
                    </div>
                    <!-- 右侧区域展示挂号的钱数-->
                    <div class="right">
                    <div class="money">￥{{ doctor.amount }}</div>
                    <el-button type="primary" size="default" @click="goStep2(doctor)">{{
                        doctor.maxPatients-doctor.registered
                    }}</el-button>
                    </div>
                </div>
                <div v-else>
                  <p>暂无医生排班</p>
                </div>
                </div>
                <!-- 下午 -->
                <div class="moring">
                <!-- 顶部文字提示 -->
                <div class="tip">
                    <svg t="1685758544953" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2423" width="32" height="32">
                      <path d="M356.9664 562.7392H762.88a61.44 61.44 0 0 1 61.44 61.44v153.6H295.7824v-153.6a61.44 61.44 0 0 1 61.184-61.44z" fill="#FFAECF" p-id="2424"></path>
                      <path d="M431.872 383.6416h256a61.44 61.44 0 0 1 61.44 61.44v117.76H370.6368v-117.76a61.44 61.44 0 0 1 61.2352-61.44z" fill="#FFAECF" p-id="2425"></path>
                      <path d="M945.152 831.5392H78.848a15.36 15.36 0 0 1 0-30.72h866.304a15.36 15.36 0 0 1 0 30.72z" fill="#8E5178" p-id="2426"></path>
                      <path d="M661.1456 998.4H362.8544a15.36 15.36 0 0 1-15.36-15.36v-35.0208a32.9728 32.9728 0 0 1 32.9216-32.9216 82.3808 82.3808 0 0 0 82.2784-82.2784v-16.384a15.36 15.36 0 0 1 15.36-15.36h67.8912a15.36 15.36 0 0 1 15.36 15.36v16.384a82.3808 82.3808 0 0 0 82.2784 82.2784 32.9728 32.9728 0 0 1 32.9216 32.9216V983.04a15.36 15.36 0 0 1-15.36 15.36z m-282.9312-30.72h267.5712v-19.6608a2.2016 2.2016 0 0 0-2.2016-2.2016 113.1008 113.1008 0 0 1-112.9984-112.9984v-1.024h-37.1712v1.024a113.1008 113.1008 0 0 1-112.9984 112.7424 2.2016 2.2016 0 0 0-2.2016 2.2016z" fill="#8E5178" p-id="2427"></path>
                      <path d="M776.0384 831.5392H247.9616a15.36 15.36 0 0 1-15.36-15.36v-153.6a76.8 76.8 0 0 1 76.8-76.8h405.6064a76.8 76.8 0 0 1 76.8 76.8v153.6a15.36 15.36 0 0 1-15.7696 15.36z m-512.7168-30.72h497.3568v-138.24a46.08 46.08 0 0 0-46.08-46.08H309.1968a46.08 46.08 0 0 0-46.08 46.08z" fill="#8E5178" p-id="2428"></path>
                      <path d="M701.1328 616.5504H322.8672a15.36 15.36 0 0 1-15.36-15.36v-117.76a76.8 76.8 0 0 1 76.8-76.8h256a76.8 76.8 0 0 1 76.8 76.8v117.76a15.36 15.36 0 0 1-15.9744 15.36z m-362.9056-30.72h347.5456v-102.4a46.08 46.08 0 0 0-46.08-46.08H384a46.08 46.08 0 0 0-46.08 46.08z" fill="#8E5178" p-id="2429"></path>
                      <path d="M641.3312 437.4528H382.6688a15.36 15.36 0 0 1-15.36-15.36V336.2304a76.8 76.8 0 0 1 76.8-76.8h136.192a76.8 76.8 0 0 1 76.8 76.8v85.8624a15.36 15.36 0 0 1-15.7696 15.36z m-243.3024-30.72h227.9424V336.2304a46.08 46.08 0 0 0-46.08-46.08H443.904a46.08 46.08 0 0 0-46.08 46.08z" fill="#8E5178" p-id="2430"></path>
                      <path d="M845.5168 831.5392H178.4832a15.36 15.36 0 0 1-15.36-15.36V374.7328a348.8768 348.8768 0 0 1 697.7536 0v441.4464a15.36 15.36 0 0 1-15.36 15.36z m-651.6736-30.72h636.3136V374.7328a318.1568 318.1568 0 0 0-636.3136 0z" fill="#8E5178" p-id="2431"></path>
                      <path d="M512 290.3552a15.36 15.36 0 0 1-10.24-3.6352c-2.1504-1.8944-53.504-46.6432-74.6496-77.5168a69.5808 69.5808 0 0 1-5.9392-71.68 58.368 58.368 0 0 1 52.5824-31.1296 51.2 51.2 0 0 1 38.0416 15.36 51.2 51.2 0 0 1 38.0416-15.36 58.2144 58.2144 0 0 1 52.5312 31.1296 69.4272 69.4272 0 0 1-5.888 71.68c-21.1456 30.72-72.4992 75.6224-74.6496 77.5168a15.36 15.36 0 0 1-9.8304 3.6352z m-38.0416-153.2416a27.392 27.392 0 0 0-25.6 14.7456 38.9632 38.9632 0 0 0 4.096 39.8848c13.6704 19.968 43.6736 48.3328 59.392 62.6688 15.7184-14.336 45.7216-42.7008 59.392-62.6688a38.9632 38.9632 0 0 0 4.096-39.8848 27.392 27.392 0 0 0-25.6-14.7456 22.9376 22.9376 0 0 0-22.9888 18.8416 15.36 15.36 0 0 1-15.36 12.2368 15.36 15.36 0 0 1-14.9504-12.4416 22.8864 22.8864 0 0 0-22.4768-18.6368zM600.576 537.1392a44.9536 44.9536 0 0 1-32.5632-14.1312c-5.12-4.6592-6.9632-6.144-11.8784-6.144s-6.7584 1.4848-11.8272 6.144a44.5952 44.5952 0 0 1-65.1264 0c-5.12-4.6592-6.9632-6.144-11.8784-6.144s-6.7584 1.4848-11.8272 6.144a44.5952 44.5952 0 0 1-65.1264 0c-5.12-4.6592-6.9632-6.144-11.8784-6.144a15.36 15.36 0 0 1 0-30.72 44.9536 44.9536 0 0 1 32.5632 14.1312c5.12 4.6592 6.9632 6.144 11.8784 6.144s6.7584-1.4848 11.8272-6.144a44.5952 44.5952 0 0 1 65.1264 0c5.12 4.6592 6.9632 6.144 11.8784 6.144s6.7584-1.4848 11.8272-6.144a44.5952 44.5952 0 0 1 65.1264 0c5.12 4.6592 6.9632 6.144 11.8784 6.144s6.7584-1.4848 11.8784-6.144A44.8512 44.8512 0 0 1 645.12 486.4a15.36 15.36 0 0 1 0 30.72c-5.12 0-6.7584 1.4848-11.8784 6.144a44.8512 44.8512 0 0 1-32.6656 13.8752z" fill="#8E5178" p-id="2432"></path>
                    </svg>
                    <span class="text">下午号源</span>
                </div>
                <!--每一个医生的信息-->
                <div class="doc_info" v-for="doctor in afterArr" :key="doctor.docId" v-if="isSchedulerAfternoon">
                    <!-- 展示医生的名字|技能 -->
                    <div class="left">
                    <div class="info">
                        <span>{{ doctor.rank }}</span>
                        <span>|</span>
                        <span>{{ doctor.doctorName }}</span>
                    </div>
                    <div class="skill">{{ doctor.profile }}</div>
                    </div>
                    <!-- 右侧区域展示挂号的钱数-->
                    <div class="right">
                    <div class="money">￥{{ doctor.amount }}</div>
                    <el-button type="primary" size="default" @click="goStep2(doctor)">{{
                        doctor.maxPatients-doctor.registered
                    }}</el-button>
                    </div>
                </div>
                <div v-else>
                  <p>暂无医生排班</p>
                </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {getHospitalScheduler} from '@/api/xyt/hospital/index'
import type {DocScheduler,DeptScheduler,ScheduleInfo} from '@/api/xyt/type'

const $router = useRouter();
const $route = useRoute();
let pageNo = ref<number>(1)
let pageSize = ref<number>(4)
let total = ref<number>(0)
let hosName = ref<string>('')
let fatherName = ref<string>('')
let deptName = ref<string>('')
let deptSchedulerData = ref<DeptScheduler[]>([])
let moringArr = ref<DocScheduler[]>([])
let afterArr = ref<DocScheduler[]>([])
let isSchedulerMorning = ref<boolean>(true)
let isSchedulerAfternoon = ref<boolean>(true)
onMounted(()=>{
    getHospitalRegistrationList();
})

const getHospitalRegistrationList = async ()=>{
    let result:ScheduleInfo = await getHospitalScheduler(($route.query.hosId??'') as string, ($route.query.deptId??'') as string, pageNo.value, pageSize.value)
    if (result.code===200){
        hosName.value = result.data.hosName
        fatherName.value = result.data.fatherName
        deptName.value = result.data.name
        deptSchedulerData.value = result.data.deptSchedule
        total.value = result.data.total

        console.log(result);


        moringArr.value = result.data.deptSchedule[0].docScheduler.filter((doc: DocScheduler) => {
            return doc.timeSlot == '上午';
        });
        if(moringArr.value.length>0){
          isSchedulerMorning.value=true
        }else{
          isSchedulerMorning.value=false
        }
        afterArr.value = result.data.deptSchedule[0].docScheduler.filter((doc: DocScheduler) => {
            return doc.timeSlot == '下午';
        });
        if(afterArr.value.length>0){
          isSchedulerAfternoon.value=true
        }else{
          isSchedulerAfternoon.value=false
        }

        console.log(isSchedulerMorning.value);
        console.log(isSchedulerAfternoon.value);
    }   
}

//点击顶部某一天的时候触发回调
const changeTime = (item: DocScheduler[]) => {
  moringArr.value = item.filter((doc: DocScheduler) => {
      return doc.timeSlot == '上午';
  });
  if(moringArr.value.length>0){
    isSchedulerMorning.value=true
  }else{
    isSchedulerMorning.value=false
  }
  afterArr.value = item.filter((doc: DocScheduler) => {
      return doc.timeSlot == '下午';
  });
  if(afterArr.value.length>0){
    isSchedulerAfternoon.value=true
  }else{
    isSchedulerAfternoon.value=false
  }
};

function handleSizeChange() {
    getHospitalRegistrationList()
}
function handleCurrentChange() {
    getHospitalRegistrationList()
}

function formatWeek( week:number) {
  switch (week) {
    case 1:
        return "周一";
    case 2:
        return "周二";
    case 3:
        return "周三";
    case 4:
        return "周四";
    case 5:
        return "周五";
    case 6:
        return "周六";
    default:
        return "周日";
  }
}

const hasReached3PM = ()=> {
  const now = new Date();
  const threePM = new Date();
  threePM.setHours(15, 0, 0, 0); // 设置为今天的 15:00:00.000
  return now >= threePM;
}

const isToday = (dateStr:string) => {
  const inputDate = new Date(dateStr);
  const today = new Date();

  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  );
}

//路由跳转进入到选择就诊人页面
const goStep2 = (doctor: DocScheduler) => {
    //编程式导航进行路由跳转且携带医生的ID
    $router.push({ path: "/hospital/register3", query: { docId: doctor.docId } });
};
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
            &.active{
                border: 1px solid #7f7f7f;
                color: #7f7f7f;
                .header{
                    background: #ccc;
                }
            }
        }
    }
  }
  .fotter {
    .will {
      font-size: 24px;
      font-weight: 900;
      .time {
        color: red;
      }
      .willText {
        color: skyblue;
      }
    }
    .doctor {
      p {
        margin: 20px 0 20px 0;
        color: #7f7f7f;
      }
      .moring {
        .tip {
          display: flex;
          align-items: center;
          .text {
            color: #7f7f7f;
            font-weight: 900;
          }
        }
        .doc_info {
          display: flex;
          justify-content: space-between;
          margin: 10px 0px;
          border-bottom: 1px solid #ccc;
          .left {
            .info {
              color: skyblue;
              margin: 10px 0px;
              span {
                margin: 0px 5px;
                font-size: 18px;
                font-weight: 900;
              }
            }
            .skill {
              margin: 10px 0px;
              color: #7f7f7f;
            }
          }
          .right {
            width: 150px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .money {
              color: #7f7f7f;
              font-weight: 900;
            }
          }
        }
      }
    }
  }
}
</style>