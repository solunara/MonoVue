<template>
  <div>获取验证码({{ number }}s)</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
let number = ref<number>(60)
let props = defineProps(["flag"])
let $emit = defineEmits(["getFlag"])
watch(
  () => props.flag,
  (newVal, oldVal) => {
    let timer = setInterval(() => {
      number.value--
      if (number.value < 0) {
        $emit("getFlag", false)
        clearInterval(timer)
      }
    }, 1000)
  },
  {
    immediate: true
  }
)
</script>

<style scoped></style>
