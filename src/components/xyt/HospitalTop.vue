<template>
    <div class="xyt_top">
        <div class="content">
            <div class="left">
                <p>小医通 在线预约挂号平台</p>
            </div>
            <div class="right">
                <p class="help">帮助信息</p>
                <p class="login">登陆/注册</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.xyt_top {
    width: 100%;
    height: 70px;
    background: #fff;
    display: flex;
    justify-content: center;
    z-index: 999;
    .content {
        width: 80%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        .left{
            display: flex;
            justify-content: center;
            align-items: center;
            p {
                font-size: 20px;
                color: #55a6fe;
            }
        }
        .right{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #bbb;
            .help {
                margin-right: 10px;
            }
        }
    }
}
</style>