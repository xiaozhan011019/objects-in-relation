<template>
  <div class="exploration-tab">
    <div class="exploration-layout">
      <!-- 左侧文章列表区域 -->
      <div class="papers-list-container" ref="papersContainer">
        <div 
          v-for="(paper, index) in filteredPapers" 
          :key="paper.number"
          class="paper-card"
          :class="{ expanded: expandedPapers.has(paper.number) }"
          @click="togglePaperExpand(paper.number)"
        >
          <div class="paper-index">{{ index + 1 }}</div>
          <div class="paper-thumbnail">
            <img :src="withBase('/thumbnails/' + paper.thumbnail)" :alt="paper.title" @error="handleImageError">
          </div>
          <div class="paper-content">
            <p class="paper-title">{{ paper.title }}</p>
            <p v-if="paper.conference" class="paper-conference">{{ paper.conference }}</p>
            <p class="paper-authors">{{ paper.authors }}</p>
            
            <!-- 详细视图：标签显示 -->
            <div v-if="expandedPapers.has(paper.number)" class="paper-tags">
              <div 
                v-for="subcategory in allSubcategories" 
                :key="subcategory"
                class="tag-row"
              >
                <span 
                  class="tag-category-name"
                  :style="{ color: getSubcategoryColors(subcategory)?.filterTextColor }"
                >
                  {{ subcategory }}:
                </span>
                <div class="tag-list">
                  <span 
                    v-for="tag in paper[subcategory] || []" 
                    :key="tag"
                    class="tag-item"
                    :style="{ 
                      backgroundColor: getTagBgColor(subcategory),
                      color: getTagTextColor(subcategory)
                    }"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              
              <!-- 论文链接 -->
              <div v-if="paper.link" class="paper-link-container">
                <a :href="paper.link" target="_blank" class="paper-link" @click.stop>
                  <img :src="withBase('/icons/link.svg')" alt="link" class="link-icon" @error="handleIconError">
                  <span>{{ paper.link }}</span>
                </a>
              </div>
            </div>
          </div>
          <div class="expand-icon">
            <svg v-if="!expandedPapers.has(paper.number)" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <!-- 右侧筛选区域 -->
      <div 
        class="filter-sidebar" 
        ref="filterSidebar"
        @mouseenter="isMouseInFilter = true"
        @mouseleave="isMouseInFilter = false"
      >
        <div class="filter-content">
          <!-- Time Filter -->
          <div class="filter-section">
            <h3 class="filter-title">Time Filter:</h3>
            <div class="time-range-display">
              <span>{{ minYear }}</span>
              <span>{{ maxYear }}</span>
            </div>
            <div class="time-slider-container">
              <input 
                type="range" 
                :min="minYear" 
                :max="maxYear" 
                v-model.number="timeRange[0]"
                class="time-slider time-slider-min"
              >
              <input 
                type="range" 
                :min="minYear" 
                :max="maxYear" 
                v-model.number="timeRange[1]"
                class="time-slider time-slider-max"
              >
              <div class="slider-track">
                <div 
                  class="slider-range" 
                  :style="sliderRangeStyle"
                ></div>
              </div>
            </div>
            
            <!-- 年份分布直方图 -->
            <div class="year-histogram">
              <div 
                v-for="year in selectedYearRange" 
                :key="year"
                class="histogram-bar-container"
                @mouseenter="showHistogramTooltip($event, year)"
                @mousemove="showHistogramTooltip($event, year)"
                @mouseleave="hideHistogramTooltip(year)"
              >
                <div 
                  class="histogram-bar"
                  :class="{ 'histogram-bar-hover': hoveredYear === year }"
                  :style="{ 
                    height: `${getSelectedYearBarHeight(year)}%`,
                    backgroundColor: timeFilterColor
                  }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Filter 标题和统计 -->
          <div class="filter-stats-section">
            <h2 class="filter-main-title">Filter</h2>
            <p class="filter-count">
              Number of instances:<br>
              {{ filteredPapers.length }} / {{ allPapers.length }}
            </p>
          </div>

          <!-- 搜索框 -->
          <div class="search-section">
            <img :src="withBase('/icons/search.svg')" alt="search" class="search-icon" @error="handleSearchIconError">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search:"
              class="search-input"
            >
            <button class="reset-btn" @click="resetFilters">Reset</button>
          </div>

          <!-- 标签筛选区域 -->
          <div class="tag-filters">
            <div 
              v-for="(category, categoryIndex) in categorizedSubcategories" 
              :key="category.name"
              class="category-filter-group"
              :class="{ 'with-separator': categoryIndex > 0 }"
            >
              <h3 
                class="category-filter-title"
                :style="{ color: getCategoryColors(category.name)?.filterTextColor }"
              >
                {{ category.name }}
              </h3>
              
              <div 
                v-for="subcategory in category.subcategories" 
                :key="subcategory"
                class="subcategory-filter"
              >
                <div class="subcategory-filter-header">
                  <span 
                    class="subcategory-filter-name"
                    :style="{ color: getSubcategoryColors(subcategory)?.filterTextColor }"
                  >
                    {{ subcategory }}:
                  </span>
                </div>
                
                <div class="filter-dropdown-container">
                  <select 
                    v-model="selectedFilters[subcategory]"
                    class="filter-dropdown"
                    :style="{ 
                      borderColor: getSubcategoryColors(subcategory)?.filterTextColor + '40'
                    }"
                  >
                    <option value="">All</option>
                    <option 
                      v-for="tag in getAvailableTags(subcategory)" 
                      :key="tag.name"
                      :value="tag.name"
                    >
                      {{ tag.name }} ({{ tag.count }})
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <div
        v-if="histogramTooltip.visible"
        ref="histogramTooltipRef"
        class="global-histogram-tooltip"
        :style="{
          left: `${histogramTooltip.left}px`,
          top: `${histogramTooltip.top}px`
        }"
      >
        <span>Time: {{ histogramTooltip.year }}</span>
        <span>Papers: {{ histogramTooltip.papers }}</span>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted, onUnmounted } from 'vue'
import {
  categoryColors,
  getTagBgColor,
  getTagTextColor,
  getCategoryColors,
  getSubcategoryColors,
  allSubcategories,
  categorizedSubcategories,
  withBase
} from '../config/colors.js'

// 颜色变量
const timeFilterColor = '#7B9CEE'

// 数据
const allPapers = ref([])
const expandedPapers = reactive(new Set())
const searchQuery = ref('')
const selectedFilters = reactive({})
const isMouseInFilter = ref(false)

// 初始化筛选器
allSubcategories.forEach(sub => {
  selectedFilters[sub] = ''
})

// 时间范围
const timeRange = ref([2003, 2025])
const hoveredYear = ref(null)
const histogramTooltipRef = ref(null)
const histogramTooltip = reactive({
  visible: false,
  year: null,
  papers: 0,
  left: 0,
  top: 0
})

// 计算属性：年份范围
const minYear = computed(() => {
  if (allPapers.value.length === 0) return 2003
  return Math.min(...allPapers.value.map(p => p.year))
})

const maxYear = computed(() => {
  if (allPapers.value.length === 0) return 2025
  return Math.max(...allPapers.value.map(p => p.year))
})

const yearRange = computed(() => {
  const years = []
  for (let y = minYear.value; y <= maxYear.value; y++) {
    years.push(y)
  }
  return years
})

// 选中范围的年份（用于直方图显示）
const selectedYearRange = computed(() => {
  const years = []
  for (let y = timeRange.value[0]; y <= timeRange.value[1]; y++) {
    years.push(y)
  }
  return years
})

// 滑块样式
const sliderRangeStyle = computed(() => {
  const min = minYear.value
  const max = maxYear.value
  const range = max - min || 1
  const left = ((timeRange.value[0] - min) / range) * 100
  const right = 100 - ((timeRange.value[1] - min) / range) * 100
  return {
    left: `${left}%`,
    right: `${right}%`
  }
})

// 统计每年论文数量
const yearCounts = computed(() => {
  const counts = {}
  yearRange.value.forEach(y => counts[y] = 0)
  allPapers.value.forEach(paper => {
    if (counts[paper.year] !== undefined) {
      counts[paper.year]++
    }
  })
  return counts
})

const maxYearCount = computed(() => {
  return Math.max(...Object.values(yearCounts.value), 1)
})

// 选中范围内的最大论文数（用于直方图缩放）
const maxSelectedYearCount = computed(() => {
  let max = 1
  for (let y = timeRange.value[0]; y <= timeRange.value[1]; y++) {
    if (yearCounts.value[y] > max) {
      max = yearCounts.value[y]
    }
  }
  return max
})

function getYearBarHeight(year) {
  return (yearCounts.value[year] / maxYearCount.value) * 100
}

// 获取选中范围内的柱状图高度（相对于选中范围内的最大值）
function getSelectedYearBarHeight(year) {
  return (yearCounts.value[year] / maxSelectedYearCount.value) * 100
}

function positionHistogramTooltip(event) {
  const tooltipWidth = histogramTooltipRef.value?.offsetWidth ?? 132
  const tooltipHeight = histogramTooltipRef.value?.offsetHeight ?? 52
  const viewportPadding = 12
  const offset = 14
  let left = event.clientX + offset
  let top = event.clientY - tooltipHeight - offset

  if (left + tooltipWidth > window.innerWidth - viewportPadding) {
    left = window.innerWidth - tooltipWidth - viewportPadding
  }
  if (left < viewportPadding) {
    left = viewportPadding
  }

  if (top < viewportPadding) {
    top = event.clientY + offset
  }
  if (top + tooltipHeight > window.innerHeight - viewportPadding) {
    top = window.innerHeight - tooltipHeight - viewportPadding
  }

  histogramTooltip.left = left
  histogramTooltip.top = top
}

function showHistogramTooltip(event, year) {
  hoveredYear.value = year
  histogramTooltip.visible = true
  histogramTooltip.year = year
  histogramTooltip.papers = yearCounts.value[year] || 0

  nextTick(() => {
    positionHistogramTooltip(event)
  })
}

function hideHistogramTooltip(year) {
  if (hoveredYear.value === year) {
    hoveredYear.value = null
  }
  histogramTooltip.visible = false
}

// 筛选后的论文
const filteredPapers = computed(() => {
  return allPapers.value.filter(paper => {
    // 时间筛选
    if (paper.year < timeRange.value[0] || paper.year > timeRange.value[1]) {
      return false
    }
    
    // 搜索筛选
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      if (!paper.title.toLowerCase().includes(query) && 
          !paper.conference.toLowerCase().includes(query) &&
          !paper.authors.toLowerCase().includes(query)) {
        return false
      }
    }
    
    // 标签筛选
    for (const [subcategory, selectedTag] of Object.entries(selectedFilters)) {
      if (selectedTag && paper[subcategory]) {
        if (!paper[subcategory].includes(selectedTag)) {
          return false
        }
      } else if (selectedTag && !paper[subcategory]) {
        return false
      }
    }
    
    return true
  })
})

// 获取某个标签类别下可用的标签及其数量
function getAvailableTags(subcategory) {
  const tagCounts = {}
  allPapers.value.forEach(paper => {
    const tags = paper[subcategory] || []
    tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

// 切换论文展开状态
function togglePaperExpand(paperId) {
  if (expandedPapers.has(paperId)) {
    expandedPapers.delete(paperId)
  } else {
    expandedPapers.add(paperId)
  }
}

// 重置筛选器
function resetFilters() {
  searchQuery.value = ''
  timeRange.value = [minYear.value, maxYear.value]
  allSubcategories.forEach(sub => {
    selectedFilters[sub] = ''
  })
}

// 图片加载错误处理
function handleImageError(e) {
  e.target.src = withBase('/thumbnails/placeholder.png')
}

function handleIconError(e) {
  e.target.style.display = 'none'
}

function handleSearchIconError(e) {
  e.target.style.display = 'none'
}

// 滚动处理
const papersContainer = ref(null)
const filterSidebar = ref(null)

function handleWheel(e) {
  if (isMouseInFilter.value && filterSidebar.value) {
    // 检查是否为两列布局（桌面模式，宽度 > 1024px）
    const isTwoColumnLayout = window.innerWidth > 1024
    
    // 只在两列布局时拦截滚轮事件
    // 单列布局时让滚轮正常滚动页面
    if (isTwoColumnLayout) {
      // 鼠标在筛选区，阻止页面滚动，让筛选区滚动
      e.preventDefault()
      filterSidebar.value.scrollTop += e.deltaY
    }
  }
}

// 加载论文数据
async function loadPapers() {
  try {
    const response = await fetch(withBase('/papers.json'))
    const data = await response.json()
    allPapers.value = data
    
    // 初始化时间范围
    if (data.length > 0) {
      const years = data.map(p => p.year)
      timeRange.value = [Math.min(...years), Math.max(...years)]
    }
  } catch (error) {
    console.error('加载论文数据失败:', error)
    // 使用示例数据
    allPapers.value = []
  }
}

onMounted(() => {
  loadPapers()
  window.addEventListener('wheel', handleWheel, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
})
</script>

<style scoped>
/* 颜色变量 */
:root {
  --bg-color: #F2F5FF;
  --time-filter-color: #7B9CEE;
  --card-shadow: rgba(80, 100, 180, 0.25);
  --text-primary: #333;
  --text-secondary: #666;
}

.exploration-tab {
  width: 100%;
}

.exploration-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

/* 左侧文章列表 */
.papers-list-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.paper-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 6px 6px 20px rgba(80, 100, 180, 0.25);
  cursor: pointer;
  transition: all 0.3s ease;
}

.paper-card:hover {
  box-shadow: 8px 8px 25px rgba(80, 100, 180, 0.3);
  transform: translateY(-2px);
}

.paper-card.expanded {
  align-items: flex-start;
}

.paper-index {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  min-width: 30px;
  text-align: center;
}

.paper-thumbnail {
  width: 100px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f0f0f0;
}

.paper-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.paper-content {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.paper-title {
  font-size: 15px;
  font-weight: 600;
  color: #000;
  margin: 0 0 8px 0;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.paper-conference {
  display: inline-block;
  max-width: 100%;
  font-size: 10px;
  font-weight: 400;
  color: #777777;
  line-height: 1.4;
  padding: 3px 10px;
  border: 1px solid #888888;
  border-radius: 100px;
  margin: -2px 0 8px;
  overflow-wrap: anywhere;
}

.paper-authors {
  font-size: 12px;
  color: #666;
  margin: 0;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.expand-icon {
  color: #999;
  flex-shrink: 0;
  margin-top: 5px;
}

/* 标签区域 */
.paper-tags {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tag-row {
  display: flex;
  align-items: flex-start;
  gap: 0;
  min-height: 24px;
}

.tag-category-name {
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  white-space: nowrap;
  padding: 0;
  margin: 0;
  line-height: 24px; /* 调整此值以对齐标签框，增大数值会增加行距 */
}

.tag-list {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0;
  margin: 0;
  margin-left: 6px;
}

.tag-item {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 50px;
  white-space: nowrap;
}

/* 论文链接 */
.paper-link-container {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.paper-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #888888;
  text-decoration: underline;
  font-size: 12px;
  transition: opacity 0.2s ease;
}

.paper-link:hover {
  opacity: 0.7;
}

.link-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transform: scale(0.8);
}

/* 右侧筛选区域 */
.filter-sidebar {
  width: 340px;
  flex-shrink: 0;
  background: white;
  border-radius: 16px;
  box-shadow: 6px 6px 20px rgba(80, 100, 180, 0.25);
  max-height: calc(100vh - 200px);
  overflow-x: hidden;
  overflow-y: auto;
  position: sticky;
  top: 20px;
}

.filter-content {
  padding: 20px 18px 20px 22px;
}

/* Time Filter */
.filter-section {
  margin-bottom: 25px;
}

.filter-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 15px 0;
}

.time-range-display {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
}

.time-slider-container {
  position: relative;
  height: 30px;
  margin-bottom: 15px;
}

.time-slider {
  position: absolute;
  width: 100%;
  height: 30px;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
  top: 0;
  z-index: 2;
  margin: 0;
}

.time-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #7B9CEE;
  cursor: pointer;
  pointer-events: auto;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 3;
}

.time-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #7B9CEE;
  cursor: pointer;
  pointer-events: auto;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.slider-track {
  position: absolute;
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  top: 12px;
}

.slider-range {
  position: absolute;
  height: 100%;
  background: #7B9CEE;
  border-radius: 3px;
}

/* 直方图 */
.year-histogram {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 60px;
  padding: 5px 0;
}

.histogram-bar-container {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  position: relative;
  cursor: pointer;
}

.histogram-bar {
  width: 100%;
  min-height: 2px;
  border-radius: 2px 2px 0 0;
  transition: height 0.3s ease, transform 0.15s ease, filter 0.15s ease;
}

.histogram-bar-hover {
  transform: scaleY(1.05);
  filter: brightness(1.1);
}

.global-histogram-tooltip {
  position: fixed;
  background: rgba(51, 51, 51, 0.9);
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 11px;
  white-space: nowrap;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 2px;
  pointer-events: none;
}

/* Filter 统计区 */
.filter-stats-section {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.filter-main-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0 0 10px 0;
}

.filter-count {
  font-size: 13px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* 搜索框 */
.search-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 25px;
}

.search-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #7B9CEE;
}

.search-input::placeholder {
  color: #999;
}

.reset-btn {
  padding: 8px 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.reset-btn:hover {
  background: #f5f5f5;
  border-color: #ccc;
}

/* 标签筛选区域 */
.tag-filters {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.category-filter-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-filter-group.with-separator {
  padding-top: 20px;
  border-top: 1px solid #D4E5F6;
  margin-top: 0;
}

.category-filter-title {
  font-size: 15px;
  font-weight: 700;
  margin: 0;
}

.subcategory-filter {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.subcategory-filter-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.subcategory-filter-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  object-position: center;
  flex-shrink: 0;
}

.subcategory-filter-name {
  font-size: 13px;
  font-weight: 600;
}

.filter-dropdown-container {
  width: 100%;
}

.filter-dropdown {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  background: white;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease;
}

.filter-dropdown:focus {
  border-color: #7B9CEE;
}

/* 滚动条样式 */
.filter-sidebar::-webkit-scrollbar {
  width: 4px;
}

.filter-sidebar::-webkit-scrollbar-track {
  background: transparent;
  margin: 12px 0;
}

.filter-sidebar::-webkit-scrollbar-thumb {
  background: #d0d0d0;
  border-radius: 2px;
}

.filter-sidebar::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}

/* ==================== 响应式设计 ==================== */

/* 桌面 (1200px - 1400px) */
@media screen and (max-width: 1400px) {
  .exploration-layout {
    gap: 25px;
  }
  
  .filter-sidebar {
    width: 320px;
  }
}

/* 小桌面 (1024px - 1200px) */
@media screen and (max-width: 1200px) {
  .exploration-layout {
    gap: 20px;
  }
  
  .paper-card {
    gap: 15px;
    padding: 18px;
    border-radius: 14px;
  }
  
  .paper-index {
    font-size: 16px;
    min-width: 26px;
  }
  
  .paper-thumbnail {
    width: 90px;
    height: 72px;
  }
  
  .paper-title {
    font-size: 14px;
  }
  
  .paper-authors {
    font-size: 11px;
  }
  
  .filter-sidebar {
    width: 300px;
    border-radius: 14px;
  }
  
  .filter-content {
    padding: 18px 16px 18px 20px;
  }
  
  .filter-main-title {
    font-size: 16px;
  }
  
  .category-filter-title {
    font-size: 14px;
  }
  
  .subcategory-filter-name {
    font-size: 12px;
  }
}

/* 平板 (768px - 1024px) */
@media screen and (max-width: 1024px) {
  .exploration-layout {
    flex-direction: column;
    gap: 25px;
  }
  
  .papers-list-container {
    order: 2;
    gap: 15px;
  }
  
  .paper-card {
    gap: 15px;
    padding: 16px;
    border-radius: 12px;
  }
  
  .paper-index {
    font-size: 15px;
    min-width: 24px;
  }
  
  .paper-thumbnail {
    width: 80px;
    height: 64px;
    border-radius: 6px;
  }
  
  .paper-title {
    font-size: 14px;
  }
  
  .paper-authors {
    font-size: 11px;
  }
  
  .tag-category-name {
    font-size: 11px;
    min-width: 120px;
  }
  
  .tag-item {
    font-size: 10px;
    padding: 3px 10px;
  }
  
  .paper-link {
    font-size: 11px;
  }
  
  .link-icon {
    width: 14px;
    height: 14px;
  }
  
  .filter-sidebar {
    order: 1;
    width: 100%;
    max-height: none;
    position: relative;
    top: 0;
    border-radius: 14px;
  }
  
  .filter-content {
    padding: 20px;
  }
  
  /* 筛选区布局优化 - 平板横向布局 */
  .filter-stats-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
  
  .filter-count {
    text-align: right;
  }
  
  .filter-count br {
    display: none;
  }
  
  .search-section {
    margin-bottom: 20px;
  }
  
  .tag-filters {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 30px;
  }
  
  .year-histogram {
    height: 50px;
  }
}

/* 大手机 (576px - 768px) */
@media screen and (max-width: 768px) {
  .exploration-layout {
    gap: 20px;
  }
  
  .papers-list-container {
    gap: 12px;
  }
  
  .paper-card {
    gap: 12px;
    padding: 14px;
    border-radius: 10px;
    flex-wrap: wrap;
  }
  
  .paper-index {
    font-size: 14px;
    min-width: 22px;
  }
  
  .paper-thumbnail {
    width: 70px;
    height: 56px;
    border-radius: 5px;
  }
  
  .paper-content {
    flex: 1;
    min-width: calc(100% - 130px);
  }
  
  .paper-title {
    font-size: 13px;
    margin-bottom: 6px;
  }
  
  .paper-authors {
    font-size: 10px;
  }
  
  .expand-icon {
    position: absolute;
    right: 14px;
    top: 14px;
  }
  
  .expand-icon svg {
    width: 16px;
    height: 16px;
  }
  
  .paper-tags {
    margin-top: 12px;
    gap: 6px;
  }
  
  .tag-row {
    flex-direction: column;
    gap: 4px;
  }
  
  .tag-category-name {
    font-size: 10px;
    min-width: auto;
  }
  
  .tag-list {
    gap: 4px;
  }
  
  .tag-item {
    font-size: 9px;
    padding: 3px 8px;
  }
  
  .paper-link {
    font-size: 10px;
    gap: 4px;
  }
  
  .link-icon {
    width: 12px;
    height: 12px;
  }
  
  .filter-sidebar {
    border-radius: 12px;
  }
  
  .filter-content {
    padding: 16px;
  }
  
  .filter-section {
    margin-bottom: 20px;
  }
  
  .filter-title {
    font-size: 13px;
    margin-bottom: 12px;
  }
  
  .time-range-display {
    font-size: 11px;
  }
  
  .year-histogram {
    height: 45px;
  }
  
  .filter-stats-section {
    flex-direction: column;
    text-align: center;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }
  
  .filter-main-title {
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  .filter-count {
    font-size: 12px;
    text-align: center;
  }
  
  .filter-count br {
    display: inline;
  }
  
  .search-section {
    gap: 6px;
    margin-bottom: 18px;
  }
  
  .search-icon {
    width: 16px;
    height: 16px;
  }
  
  .search-input {
    padding: 7px 9px;
    font-size: 11px;
  }
  
  .reset-btn {
    padding: 7px 10px;
    font-size: 11px;
  }
  
  .tag-filters {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .category-filter-group {
    gap: 10px;
  }
  
  .category-filter-title {
    font-size: 13px;
  }
  
  .subcategory-filter {
    gap: 6px;
  }
  
  .subcategory-filter-header {
    gap: 6px;
  }
  
  .subcategory-filter-icon {
    width: 18px;
    height: 18px;
  }
  
  .subcategory-filter-name {
    font-size: 12px;
  }
  
  .filter-dropdown {
    padding: 7px 10px;
    font-size: 11px;
  }
}

/* 手机 (480px - 576px) */
@media screen and (max-width: 576px) {
  .exploration-layout {
    gap: 15px;
  }
  
  .papers-list-container {
    gap: 10px;
  }
  
  .paper-card {
    gap: 10px;
    padding: 12px;
    border-radius: 8px;
    position: relative;
  }
  
  .paper-index {
    font-size: 13px;
    min-width: 20px;
  }
  
  .paper-thumbnail {
    width: 60px;
    height: 48px;
    border-radius: 4px;
  }
  
  .paper-content {
    min-width: calc(100% - 110px);
  }
  
  .paper-title {
    font-size: 12px;
    margin-bottom: 4px;
    line-height: 1.3;
  }
  
  .paper-authors {
    font-size: 9px;
    line-height: 1.3;
  }
  
  .expand-icon {
    right: 12px;
    top: 12px;
  }
  
  .expand-icon svg {
    width: 14px;
    height: 14px;
  }
  
  .paper-tags {
    margin-top: 10px;
    gap: 5px;
  }
  
  .tag-category-name {
    font-size: 9px;
  }
  
  .tag-item {
    font-size: 8px;
    padding: 2px 6px;
  }
  
  .paper-link-container {
    margin-top: 10px;
  }
  
  .paper-link {
    font-size: 9px;
    gap: 3px;
    word-break: break-all;
  }
  
  .link-icon {
    width: 10px;
    height: 10px;
  }
  
  .filter-sidebar {
    border-radius: 10px;
  }
  
  .filter-content {
    padding: 14px;
  }
  
  .filter-section {
    margin-bottom: 18px;
  }
  
  .filter-title {
    font-size: 12px;
    margin-bottom: 10px;
  }
  
  .time-range-display {
    font-size: 10px;
  }
  
  .time-slider::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    border: 2px solid white;
  }
  
  .time-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: 2px solid white;
  }
  
  .year-histogram {
    height: 40px;
  }
  
  .filter-main-title {
    font-size: 15px;
  }
  
  .filter-count {
    font-size: 11px;
  }
  
  .search-section {
    gap: 5px;
    margin-bottom: 15px;
  }
  
  .search-icon {
    width: 14px;
    height: 14px;
  }
  
  .search-input {
    padding: 6px 8px;
    font-size: 10px;
    border-radius: 6px;
  }
  
  .reset-btn {
    padding: 6px 8px;
    font-size: 10px;
    border-radius: 6px;
  }
  
  .tag-filters {
    gap: 14px;
  }
  
  .category-filter-group {
    gap: 8px;
  }
  
  .category-filter-title {
    font-size: 12px;
  }
  
  .subcategory-filter {
    gap: 5px;
  }
  
  .subcategory-filter-icon {
    width: 16px;
    height: 16px;
  }
  
  .subcategory-filter-name {
    font-size: 11px;
  }
  
  .filter-dropdown {
    padding: 6px 8px;
    font-size: 10px;
    border-radius: 6px;
  }
}

/* 小手机 (<480px) */
@media screen and (max-width: 480px) {
  .exploration-layout {
    gap: 12px;
  }
  
  .papers-list-container {
    gap: 8px;
  }
  
  .paper-card {
    gap: 8px;
    padding: 10px;
    border-radius: 6px;
  }
  
  .paper-index {
    font-size: 12px;
    min-width: 18px;
  }
  
  .paper-thumbnail {
    width: 50px;
    height: 40px;
    border-radius: 3px;
  }
  
  .paper-content {
    min-width: calc(100% - 95px);
  }
  
  .paper-title {
    font-size: 11px;
    margin-bottom: 3px;
  }
  
  .paper-authors {
    font-size: 8px;
  }
  
  .expand-icon {
    right: 10px;
    top: 10px;
  }
  
  .expand-icon svg {
    width: 12px;
    height: 12px;
  }
  
  .paper-tags {
    margin-top: 8px;
    gap: 4px;
  }
  
  .tag-category-name {
    font-size: 8px;
  }
  
  .tag-item {
    font-size: 7px;
    padding: 2px 5px;
  }
  
  .paper-link-container {
    margin-top: 8px;
  }
  
  .paper-link {
    font-size: 8px;
    gap: 2px;
    word-break: break-all;
  }
  
  .link-icon {
    width: 9px;
    height: 9px;
  }
  
  .filter-sidebar {
    border-radius: 8px;
  }
  
  .filter-content {
    padding: 12px;
  }
  
  .filter-section {
    margin-bottom: 15px;
  }
  
  .filter-title {
    font-size: 11px;
    margin-bottom: 8px;
  }
  
  .time-range-display {
    font-size: 9px;
  }
  
  .time-slider::-webkit-slider-thumb {
    width: 14px;
    height: 14px;
  }
  
  .time-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
  }
  
  .year-histogram {
    height: 35px;
  }
  
  .filter-stats-section {
    margin-bottom: 12px;
    padding-bottom: 12px;
  }
  
  .filter-main-title {
    font-size: 14px;
  }
  
  .filter-count {
    font-size: 10px;
  }
  
  .search-section {
    gap: 4px;
    margin-bottom: 12px;
  }
  
  .search-icon {
    width: 12px;
    height: 12px;
  }
  
  .search-input {
    padding: 5px 6px;
    font-size: 9px;
    border-radius: 5px;
  }
  
  .reset-btn {
    padding: 5px 6px;
    font-size: 9px;
    border-radius: 5px;
  }
  
  .tag-filters {
    gap: 12px;
  }
  
  .category-filter-group {
    gap: 6px;
  }
  
  .category-filter-title {
    font-size: 11px;
  }
  
  .subcategory-filter {
    gap: 4px;
  }
  
  .subcategory-filter-header {
    gap: 4px;
  }
  
  .subcategory-filter-icon {
    width: 14px;
    height: 14px;
  }
  
  .subcategory-filter-name {
    font-size: 10px;
  }
  
  .filter-dropdown {
    padding: 5px 6px;
    font-size: 9px;
    border-radius: 5px;
  }
}
</style>
