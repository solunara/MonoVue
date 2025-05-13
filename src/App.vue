<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component = null }">
    <transition name="fade-slide" mode="out-in">
      <component v-if="Component" :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
body,
html,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: #0d0d0d;
}
</style>
