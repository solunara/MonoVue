<template>
    <div class="region">
        <div class="content">
            <div class="left">地区：</div>
            <ul class="hospital_region">
                <li class="active">全部</li>
                <li>昌平区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
                <li>东城区</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.region {
    color: #7f7f7f;
    margin-top: 20px;
    .content {
        display: flex;
        .left {
            margin-right: 10px;
            width: 50px;
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            li {
                margin-right: 10px;
                margin-bottom: 10px;
                &.active {
                    color: #55a6fe;
                }
            }
            li:hover {
                color: #55a6fe;
                cursor: pointer;
            }
        }
    }
}
</style>