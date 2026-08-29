<template>
  <div class="app-container">
    <!-- 标题部分 -->
    <header class="header">
      <h1 class="main-title">
        Objects in Relation: A Design Space for Composing Two Everyday Objects into Tangible User Interfaces in Mixed Reality
      </h1>
    </header>

    <!-- 主图 -->
    <div class="main-image-container card">
      <img :src="mainImageSrc" alt="Main overview" class="main-image">
    </div>

    <!-- Abstract部分 -->
    <section class="abstract-section card">
      <h2 class="abstract-title">Abstract</h2>
      <div class="abstract-content" v-html="abstractContent"></div>
    </section>

    <!-- 导航标签 -->
    <nav class="navigation">
      <button
        v-for="item in navItems"
        :key="item.id"
        :class="['nav-tab', { active: isActiveNav(item) }]"
        @click="handleNavClick(item)"
      >
        {{ item.name }}
      </button>
    </nav>

    <!-- 标签页内容 -->
    <main class="tab-content">
      <component :is="currentTabComponent" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HomeTab from './components/HomeTab.vue'
import ExplorationTab from './components/ExplorationTab.vue'
import ContactTab from './components/ContactTab.vue'
import { withBase } from './config/colors.js'

const currentTab = ref('home')

const navItems = [
  { id: 'home', name: 'Home', type: 'tab' },
  { id: 'exploration', name: 'Exploration', type: 'tab' },
  { id: 'papers', name: 'Papers', type: 'link', url: withBase('/paper.pdf') },
  { id: 'contact', name: 'Contact', type: 'tab' }
]

const mainImageSrc = withBase('/main.svg')

const abstractContent = `This provisional site organizes <em>two-entity interaction combinations in mixed reality</em> across 75 coded cases: 29 literature-derived cases from 20 publications, 26 concepts generated through team brainstorming, and 20 concepts generated in a designer workshop. Each case is described across entity resources, relational composition, interaction dynamics, and interaction display. The final abstract will replace this provisional summary after the review text is confirmed.`

function handleNavClick(item) {
  if (item.type === 'link') {
    window.open(item.url, '_blank', 'noopener,noreferrer')
    return
  }

  currentTab.value = item.id
}

function isActiveNav(item) {
  return item.type === 'tab' && currentTab.value === item.id
}

const currentTabComponent = computed(() => {
  const components = {
    home: HomeTab,
    exploration: ExplorationTab,
    contact: ContactTab
  }
  return components[currentTab.value]
})
</script>

<style scoped>
.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 60px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.main-title {
  font-size: 32px;
  font-weight: 700;
  color: #000;
  line-height: 1.4;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 6px 6px 20px rgba(80, 100, 180, 0.25);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 8px 8px 25px rgba(80, 100, 180, 0.3);
  transform: translateY(-1px);
}

.main-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: white;
}

.main-image {
  width: 100%;
  height: auto;
  display: block;
}

.abstract-section {
  padding: 40px;
}

.abstract-title {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin-bottom: 20px;
}

.abstract-content {
  font-size: 14px;
  color: #333;
  line-height: 1.8;
  text-align: justify;
  text-align-last: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.navigation {
  display: flex;
  gap: 2%;
  justify-content: center;
  margin: 40px auto;
  max-width: 85%;
  flex-wrap: wrap;
}

.nav-tab {
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 500;
  padding: 16px 0;
  flex: 1;
  min-width: 100px;
  border: none;
  border-radius: 16px;
  background: white;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 5px 5px 18px rgba(80, 100, 180, 0.25);
}

.nav-tab:hover {
  box-shadow: 6px 6px 22px rgba(80, 100, 180, 0.35);
  transform: translateY(-1px);
  background: #f8f9ff;
}

.nav-tab.active {
  background: #C8D5FF;
  color: #000;
  font-weight: 600;
  box-shadow: inset 0 4px 12px rgba(80, 100, 180, 0.35);
  transform: translateY(2px);
}

.tab-content {
  margin-top: 40px;
}

/* ==================== 响应式设计 ==================== */

/* 桌面 (1200px - 1400px) */
@media screen and (max-width: 1400px) {
  .app-container {
    padding: 35px 50px;
  }
  
  .main-title {
    font-size: 28px;
  }
  
  .nav-tab {
    font-size: 18px;
    padding: 14px 0;
  }
}

/* 小桌面 (1024px - 1200px) */
@media screen and (max-width: 1200px) {
  .app-container {
    padding: 30px 40px;
  }
  
  .main-title {
    font-size: 26px;
  }
  
  .card {
    padding: 25px;
    border-radius: 14px;
  }
  
  .abstract-section {
    padding: 30px;
  }
  
  .abstract-title {
    font-size: 22px;
  }
  
  .navigation {
    max-width: 90%;
  }
  
  .nav-tab {
    font-size: 16px;
    padding: 12px 0;
    border-radius: 14px;
  }
}

/* 平板 (768px - 1024px) */
@media screen and (max-width: 1024px) {
  .app-container {
    padding: 25px 30px;
  }
  
  .header {
    margin-bottom: 30px;
  }
  
  .main-title {
    font-size: 24px;
  }
  
  .main-title br {
    display: none;
  }
  
  .card {
    padding: 20px;
    margin-bottom: 25px;
    box-shadow: 4px 4px 15px rgba(80, 100, 180, 0.25);
  }
  
  .main-image-container {
    min-height: 250px;
  }
  
  .abstract-section {
    padding: 25px;
  }
  
  .abstract-title {
    font-size: 20px;
    margin-bottom: 15px;
  }
  
  .abstract-content {
    font-size: 13px;
  }
  
  .navigation {
    max-width: 95%;
    gap: 10px;
    margin: 30px auto;
  }
  
  .nav-tab {
    font-size: 14px;
    padding: 12px 8px;
    border-radius: 12px;
    box-shadow: 4px 4px 14px rgba(80, 100, 180, 0.25);
  }
  
  .tab-content {
    margin-top: 30px;
  }
}

/* 大手机 (576px - 768px) */
@media screen and (max-width: 768px) {
  .app-container {
    padding: 20px;
  }
  
  .header {
    margin-bottom: 25px;
  }
  
  .main-title {
    font-size: 20px;
    line-height: 1.5;
  }
  
  .card {
    padding: 18px;
    margin-bottom: 20px;
    border-radius: 12px;
  }
  
  .main-image-container {
    min-height: 200px;
  }
  
  .abstract-section {
    padding: 20px;
  }
  
  .abstract-title {
    font-size: 18px;
    margin-bottom: 12px;
  }
  
  .abstract-content {
    font-size: 13px;
    line-height: 1.7;
  }
  
  .navigation {
    max-width: 100%;
    gap: 8px;
    margin: 25px 0;
    flex-wrap: wrap;
  }
  
  .nav-tab {
    font-size: 12px;
    padding: 10px 6px;
    border-radius: 10px;
    flex: 1 1 calc(33.333% - 8px);
    min-width: calc(33.333% - 8px);
  }
  
  .tab-content {
    margin-top: 25px;
  }
}

/* 手机 (480px - 576px) */
@media screen and (max-width: 576px) {
  .app-container {
    padding: 15px;
  }
  
  .header {
    margin-bottom: 20px;
  }
  
  .main-title {
    font-size: 18px;
    line-height: 1.5;
  }
  
  .card {
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
    box-shadow: 3px 3px 12px rgba(80, 100, 180, 0.2);
  }
  
  .main-image-container {
    min-height: 150px;
  }
  
  .abstract-section {
    padding: 15px;
  }
  
  .abstract-title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .abstract-content {
    font-size: 12px;
    line-height: 1.6;
  }
  
  .navigation {
    gap: 6px;
    margin: 20px 0;
  }
  
  .nav-tab {
    font-size: 11px;
    padding: 10px 4px;
    border-radius: 8px;
    flex: 1 1 calc(33.333% - 6px);
    min-width: calc(33.333% - 6px);
  }
  
  .tab-content {
    margin-top: 20px;
  }
}

/* 小手机 (<480px) */
@media screen and (max-width: 480px) {
  .app-container {
    padding: 12px;
  }
  
  .main-title {
    font-size: 16px;
  }
  
  .card {
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 8px;
  }
  
  .main-image-container {
    min-height: 120px;
  }
  
  .abstract-section {
    padding: 12px;
  }
  
  .abstract-title {
    font-size: 15px;
  }
  
  .abstract-content {
    font-size: 11px;
  }
  
  .navigation {
    gap: 5px;
    margin: 15px 0;
  }
  
  .nav-tab {
    font-size: 10px;
    padding: 8px 3px;
    flex: 1 1 calc(50% - 5px);
    min-width: calc(50% - 5px);
  }
  
  .tab-content {
    margin-top: 15px;
  }
}
</style>
