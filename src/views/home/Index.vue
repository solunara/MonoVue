<template>
  <div class="home">
    <div class="content">
      <h1 class="title">MonoVue 项目合集</h1>
      <div class="grid">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="card"
          @mouseenter="handleMouseEnter(project.detail)"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
          @click="navigateTo(project.route)"
        >
          <h2>{{ project.name }}</h2>
          <p class="short">{{ project.description }}</p>
        </div>
      </div>

      <!-- 浮动提示框 -->
      <div
        class="tooltip"
        :class="{ active: tooltip.visible }"
        :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }"
      >
        {{ tooltip.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const navigateTo = route => {
  router.push(route)
}

const projects = [
  {
    name: "小医通",
    description: "在线预约挂号平台",
    detail: "Vue3项目",
    route: "/xyt"
  },
  {
    name: "项目二",
    description: "项目简介",
    detail: "项目技术栈介绍",
    route: "/p2"
  },
  {
    name: "项目三",
    description: "项目简介",
    detail: "项目技术栈介绍",
    route: "/p3"
  },
  {
    name: "项目四",
    description: "项目简介",
    detail: "项目技术栈介绍",
    route: "/p4"
  },
  {
    name: "项目五",
    description: "项目简介",
    detail: "项目技术栈介绍",
    route: "/p5"
  },
  {
    name: "项目六",
    description: "项目简介",
    detail: "项目技术栈介绍",
    route: "/p6"
  },
  {
    name: "项目七",
    description: "项目简介",
    detail: "项目技术栈介绍",
    route: "/p7"
  },
  {
    name: "项目八",
    description: "项目简介",
    detail: "项目技术栈介绍",
    route: "/p8"
  }
]

const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  content: ""
})

const handleMouseEnter = content => {
  tooltip.visible = true
  tooltip.content = content
}

const handleMouseMove = event => {
  const offsetX = 20
  const offsetY = 20
  const tooltipWidth = 250
  const tooltipHeight = 120

  let x = event.clientX + offsetX
  let y = event.clientY + offsetY

  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  if (x + tooltipWidth > screenWidth) {
    x = event.clientX - tooltipWidth - offsetX
  }
  if (y + tooltipHeight > screenHeight) {
    y = event.clientY - tooltipHeight - offsetY
  }

  tooltip.x = x
  tooltip.y = y
}

const handleMouseLeave = () => {
  tooltip.visible = false
}
</script>

<style scoped>
.home {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
}

.content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.title {
  font-size: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 80%;
  max-width: 1200px;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.5s, box-shadow 0.5s;
  cursor: pointer;
}

.card:hover {
  transform: rotateY(10deg) rotateX(10deg) scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
}

.card h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #00dbde;
}

.card .short {
  font-size: 1rem;
  color: #ccc;
}

/* 浮动提示框 */
.tooltip {
  position: fixed;
  z-index: 9999;
  background: rgba(50, 50, 50, 0.9);
  color: #fff;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  pointer-events: none;
  white-space: pre-wrap;
  max-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  /* 初始状态 */
  opacity: 0;
  transform: scale(1);
  transition: opacity 0.5s ease, transform 0.8s ease;
}

/* 激活状态：鼠标悬停时浮现 */
.tooltip.active {
  opacity: 1;
  transform: scale(1.1);
}

/* 手机适配 */
@media (max-width: 768px) {
  .grid {
    width: 90%;
  }
}
</style>
