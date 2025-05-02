<template>
    <div class="register">
        <!-- 顶部 -->
        <div class="top">
            <div class="title">
                <span>{{ hosDetail.getHospitalDetail?.full_name }}</span>
            </div>
            <div class="grade">
                <svg t="1745935908882" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2659" width="16" height="16"><path d="M259.60156269 433.88281277h-93.75000019a10.82812473 10.82812473 0 0 0-10.82812473 10.85156186v390.2812501c0 5.97656223 4.8515625 10.82812473 10.82812473 10.82812554h93.75000018V433.88281277z m64.9218749-3.3281249v415.2890624h447.09374982a10.82812473 10.82812473 0 0 0 10.80468759-10.82812554V830.74999963l86.484375-324.93749936a97.57031232 97.57031232 0 0 0-97.28906259-93.6093749h-181.12500028l7.54687574-38.71875064c5.15625018-26.62500009 11.32031277-45.28125027 11.32031195-81.56249946V247.53125009c0-53.7890625-43.6640625-71.78906223-97.35937482-71.78906222-53.67187518 0-97.35937481 17.99999973-97.35937481 71.78906222v44.43750028c0 50.85937463-28.42968741 82.03125037-84.49218732 133.42968732l-5.62500028 5.15625018z m447.09374982 480.32812463H165.82812537A75.89062491 75.89062491 0 0 1 90.125 835.01562473V444.73437463a75.89062491 75.89062491 0 0 1 75.70312537-75.8906249h129.515625c26.60156213-26.13281287 54.39843787-41.29687491 54.39843704-76.89843732V247.50781213C349.74218741 157.85937463 422.51562491 110.67968769 512 110.67968769s162.25781259 47.15624981 162.25781259 136.82812444v44.43750028c0 25.71093787-2.62500019 31.68750009-5.97656222 55.21874991h103.33593704c89.48437509 0 162.25781259 72.93749991 162.25781259 162.60937536v4.26562509l-86.6953125 325.78124936a75.91406287 75.91406287 0 0 1-75.56250009 71.06250037z" fill="#515151" p-id="2660"></path></svg>
                <span>{{ hosDetail.getHospitalDetail?.grade_name }}</span>
            </div>
        </div>
        <!-- 内容 -->
        <div class="content">
            <div class="left">
                <img src="@/assets/imgs/xyt/hostipal.png" alt="">
            </div>
            <div class="right">
                <div>挂号规则</div>
                <div class="time">
                    预约周期: 10天  放号时间: 08:00  停挂时间: 12:30
                </div>
                <div class="canceltime">
                    退号时间: 就诊前一天15:30前取消
                </div>
                <div class="address">
                    具体位置: {{ hosDetail.getHospitalDetail?.address }}
                </div>
            </div>
        </div>
        <!-- 医院科室数据 -->
         <div class="department">
            <!-- 一级科室菜单 -->
            <div class="leftNav">
                <ul>
                    <li @click="changeIndex(index)" :class="{active:currentIndex==index}" v-for="(dpt,index) in hosDetail.getDepartmentList" :key="dpt.uid">{{ dpt.name }}</li>
                </ul>
            </div>
            <!-- 二级科室列表 -->
            <div class="rightNav">
                <div class="showDepartment" v-for="dpt in hosDetail.getDepartmentList" :key="dpt.uid">
                    <p class="cur"> {{ dpt.name }}</p>
                    <ul>
                        <li v-for="item in dpt.children" :key="item.uid" @click="login">{{ item.name }}</li>
                    </ul>
                </div>
            </div>
         </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {useHosDetailStore} from '@/store/xyt/index'
import {useUserStore} from '@/store/xyt/user'

let userStore = useUserStore();
let hosDetail = useHosDetailStore();
let currentIndex = ref<number>(0);

onMounted(()=>{
    hosDetail.getHospitalDepartment()
})

const changeIndex = (index:number)=>{
    currentIndex.value = index
    let allP = document.querySelectorAll('.cur')
    allP[index].scrollIntoView({
        block: 'start',
        behavior: 'smooth',
    })
}

const login=()=>{
    userStore.changeLoginVisiabe();
}
</script>

<style scoped lang="scss">
.register{
    width: 100%;
        height: 100%;
    .top{
        display: flex;
        align-items: center;
        .title{
            display: flex;
            font-size: 18px;
            font-weight: 600;
        }
        .grade{
            display: flex;
            color: #7f7f7f;
            margin-left: 10px;
        }
    }
    .content{
        display: flex;
        margin-top: 20px;
        .left{
            width: 80px;
            img{
                width: 80px;
                height: 80px;
            }
        }
        .right{
            flex: 1;
            .time, .address, .canceltime {
                margin-top: 10px;
                color: #7f7f7f;
            }
        }
    }
    .department{
        display: flex;
        width: 100%;
        height: 400px;
        margin-top: 20px;
        .leftNav{
            width: 80px;
            height: 100%;
            ul {
                width: 100%;
                height: 100%;
                background: rgb(248, 248, 248);
                color: #7f7f7f;
                font-size: 14px;
                display: flex;
                flex-direction: column;
                li {
                    flex: 1;
                    text-align: center;
                    line-height: 30px;
                    &.active {
                        border-left: 2px solid red;
                        background: white;
                        color: red;
                    }
                }
            }
        }
        .rightNav{
            flex: 1;
            height: 100%;
            overflow: auto;
            color: #7f7f7f;
            margin-left: 20px;
            &::-webkit-scrollbar{
                display: none;
            }
            .showDepartment {
                p {
                    background: rgb(248, 248, 248);
                }
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    font-size: 14px;
                    li {
                        width: 33%;
                        line-height: 30px;
                    }
                }
            }
        }
    }
}
</style>