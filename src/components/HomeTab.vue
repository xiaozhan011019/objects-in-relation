<template>
  <div class="home-tab">
    <!-- 整个Categorization区域在一个大框内 -->
    <div class="categorization-container card">
      <!-- Home主图 - Categorization结构 -->
      <div class="home-main-image">
        <img :src="withBase('/taxonomy-overview.png')" alt="Two-entity interaction taxonomy overview" />
      </div>

      <!-- Categorization标题 -->
      <h2 class="categorization-title">Categorization</h2>

      <!-- 分类项 -->
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="category-item"
      >
        <div class="category-wrapper">
          <!-- 左侧展开/收缩图标 -->
          <img 
            :src="withBase('/icons/collapse.svg')"
            alt="toggle" 
            class="toggle-icon clickable"
            :class="{ rotated: category.collapsed }"
            @click="toggleCategory(category.id)"
          >
          
          <!-- 一级标题区域：嵌套的圆角矩形（大包含小） -->
          <div 
            class="category-header clickable"
            :style="{ 
              backgroundColor: category.descBgColor,
              boxShadow: '-1px 3px 5px ' + category.descShadowColor
            }"
            @click="toggleCategory(category.id)"
          >
            <!-- 小圆角矩形：一级标题名称 -->
            <span 
              class="category-name"
              :style="{ 
                backgroundColor: category.nameBgColor, 
                color: category.nameTextColor,
                boxShadow: '-2px 3px 5px ' + category.nameShadowColor
              }"
            >
              {{ category.name }}
            </span>
            <!-- 一级标题解释文字（在大矩形内） -->
            <span class="category-description" :style="{ color: category.descTextColor }">
              {{ category.description }}
            </span>
          </div>
        </div>

        <!-- 可折叠内容 -->
        <div v-show="!category.collapsed" class="category-content">
          <div 
            v-for="subcategory in category.subcategories" 
            :key="subcategory.id"
            class="subcategory-item"
          >
            <!-- 二级标题 -->
            <div class="subcategory-header">
              <span class="subcategory-text">
                <span class="subcategory-name" :style="{ color: subcategory.secondaryColor }">{{ subcategory.name }}</span> {{ subcategory.description }}
              </span>
            </div>

            <!-- 三级标题 - 统一的竖线容器 -->
            <div class="tertiary-container">
              <div 
                class="tertiary-line-unified" 
                :style="{ backgroundColor: subcategory.tertiaryColor }"
              ></div>
              <ul class="tertiary-list">
                <li 
                  v-for="item in subcategory.items" 
                  :key="item.id"
                  class="tertiary-item"
                >
                  <img :src="item.icon" :alt="item.name" class="tertiary-icon">
                  <span class="tertiary-text">
                    <span class="tertiary-name" :style="{ color: subcategory.tertiaryColor }">{{ item.name }}:</span> {{ item.description }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { categoryColors, withBase } from '../config/colors.js'
import { taxonomy } from '../config/taxonomy.js'

// 从 colors.js 生成 categories 数据
const buildCategories = () => {
  // 计算阴影颜色
  const getShadowColor = (bgColor, opacity) => {
    // 将十六进制转换为 RGB
    const hex = bgColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    // 深化颜色（保持饱和度）
    const darkenFactor = 0.7
    const newR = Math.round(r * darkenFactor + (255 - r) * 0.1)
    const newG = Math.round(g * darkenFactor + (255 - g) * 0.1)
    const newB = Math.round(b * darkenFactor + (255 - b) * 0.1)
    
    return `rgba(${newR}, ${newG}, ${newB}, ${opacity})`
  }
  
  return taxonomy.map((categoryData, index) => {
    const categoryName = categoryData.name
    const colorConfig = categoryColors[categoryName]
    
    return {
      id: index + 1,
      name: categoryName,
      description: categoryData.description,
      nameTextColor: colorConfig.primaryTextColor,
      descTextColor: colorConfig.primaryTextColor,
      nameBgColor: colorConfig.primaryBgColor,
      descBgColor: colorConfig.primaryDescBgColor,
      nameShadowColor: getShadowColor(colorConfig.primaryBgColor, 0.9),
      descShadowColor: getShadowColor(colorConfig.primaryDescBgColor, 0.85),
      collapsed: false,
      subcategories: categoryData.subcategories.map((subData, subIndex) => {
        const subName = subData.name
        const subConfig = colorConfig.subcategories[subName]
        return {
          id: (index + 1) * 10 + subIndex + 1,
          name: subName,
          secondaryColor: subConfig.secondaryTextColor,
          tertiaryColor: subConfig.tertiaryColor,
          description: subData.description,
          items: subData.items.map((item, itemIndex) => ({
            id: itemIndex + 1,
            name: item.name,
            description: item.description,
            icon: withBase(item.icon)
          }))
        }
      })
    }
  })
}

// 获取描述信息
const getDescription = (categoryName) => {
  const descriptions = {
    'Display representation': 'refers to the types and representational forms of virtual information in MR SUIs.',
    'Spatial Organization': 'refers to where SUI is anchored in MR and how they are spatially arranged relative to one another.',
    'Generation and Update Strategy': 'refers to how SUI is created and changed (e.g., layout adjustments and appearance / disappearance) in MR.',
    'Interaction Method': 'refers to the modalities and functions through which users interact with SUI in MR.',
    'Evaluation Method': 'refers to where and what aspects of SUIs are evaluated in MR.'
  }
  return descriptions[categoryName] || ''
}

const getSubcategoryDescription = (categoryName, subName) => {
  const descriptions = {
    'Display Form': 'refers to the representational media and perceptual modalities through which virtual information is presented on SUI in MR.',
    'Display Information': 'refers to the types of content presented by the SUI to support users\' perception, comprehension, decision-making, or action.',
    'Anchoring': 'refers to the anchoring location of the SUI within the MR.',
    'Layout': 'refers to the spatial organization of SUIs, reflecting how they are arranged, distributed, and hierarchically structured in space.',
    'Creation Method': 'refers to whether SUI in an MR system are automatically generated by the system or actively created and arranged by the user.',
    'Driving Mechanism': 'refers to how SUI change or transitions are triggered in MR.',
    'Interaction Modality': 'refers to the ways in which users interact with the SUI.',
    'Interaction Function': 'refers to the goals users aim to accomplish through interaction with the SUI, or the corresponding system-level functionalities that are activated or supported.',
    'Scenario': 'refers to the context in which an evaluation is carried out.',
    'Setting': 'refers to the environment or condition under which a evaluation is conducted.'
  }
  return descriptions[subName] || ''
}

const getItems = (categoryName, subName) => {
  const itemsData = {
    'Display Form': [
      { name: '2D (image)', description: 'using non-volumetric planar surfaces as the interface form, such as 2D images and text.' },
      { name: '3D (object)', description: 'using volumetric, multi-viewable 3D objects as the interface form, such as 3D models and interactive widgets.' },
      { name: 'Audio', description: 'using auditory modalities as the interface form for information presentation or feedback, such as voice-based UI prompts.' }
    ],
    'Display Information': [
      { name: 'Environmental', description: 'refers to information related to the user\'s current physical or mixed environment, such as room layout and ambient temperature.' },
      { name: 'System', description: 'refers to information about the system itself, including system state, device status, and available functions, such as battery level and APP entry points.' },
      { name: 'Intrinsic', description: 'refers to information about an object\'s intrinsic attributes, which belong to the object itself, such as ingredients.' },
      { name: 'Task and plan', description: 'refers to information directly related to the user\'s current goals, task steps, operational instructions, or action planning, such as next-step prompts and task progress.' },
      { name: 'Social and contextual', description: 'refers to information related to social interaction, others\' states, collaborative information, or social contextual cues, such as collaboration status.' },
      { name: 'Explanatory and extended', description: 'refers to explanatory or supplementary information that helps users understand the system, content, or underlying conceptual structure, such as descriptive labels.' }
    ],
    'Anchoring': [
      { name: 'User-fixed', description: 'refers to anchoring the interface to the user as the spatial reference, such that the interface remains relatively stable with respect to the user\'s body as the user moves.' },
      { name: 'Object-fixed', description: 'refers to anchoring the interface to a real or virtual object, such that its position moves together with the object.' },
      { name: 'Environment-fixed', description: 'refers to anchoring the interface to architectural elements in the physical environment, such as the ceiling, floor, and walls.' },
      { name: 'Open space', description: 'refers to an unanchored, open space in which the interface is not tied to any specific user, object, or environmental reference.' }
    ],
    'Layout': [
      { name: 'Flat', description: 'refers to interface are arranged on the same plane or within an approximately coplanar space, forming a two-dimensional mode of spatial organization.' },
      { name: '3D', description: 'refers to Interface are distributed within a three-dimensional space with depth, forming volumetric spatial organizations such as spherical, circular, or layered arrangements.' },
      { name: 'Embedded', description: 'refers to interface are combined in an embedded manner, such as enclosing or intersecting configurations.' }
    ],
    'Creation Method': [
      { name: 'Automatic', description: 'refers to interface that are automatically generated by the system without requiring direct user input, typically based on environmental sensing, task state, data changes, or algorithmic inference.' },
      { name: 'User-manual', description: 'refers to interface that are manually created by users based on their design intentions, such as through customization or the use of authoring toolkits.' },
      { name: 'Designer-manual', description: 'refers to content specified by the designer\'s intentions, which is typically treated as a default assumption and not explicitly examined or varied in the study.' }
    ],
    'Driving Mechanism': [
      { name: 'Continuous', description: 'refers to interface remains continuously visible throughout the entire interaction and does not change over time.' },
      { name: 'User-driven', description: 'refers to the interface appears or updates in response to users\' deliberate and explicit actions.' },
      { name: 'Event-driven', description: 'refers to a mechanism in which the interface is presented when the system detects that specific events or environmental conditions are met, such as temporal cues, system states, or environmental events.' },
      { name: 'Adaptive', description: 'refers to interface adaptively adjusts its visibility, content, and timing of presentation based on dynamic conditions such as user state, behavioral patterns, task context.' }
    ],
    'Interaction Modality': [
      { name: 'Tangible', description: 'refers to manipulable physical objects serve as the primary interaction carriers or proxies, allowing users to control digital information or system states through actions such as grasping, moving, rotating, or assembling physical artifacts.' },
      { name: 'Head', description: 'refers to an interaction technique that uses head movements, typically including changes in head orientation (rotation) and position as input signals.' },
      { name: 'Controller', description: 'refers to an interaction technique that uses handheld input devices (e.g., VR controllers, gamepads, or smartphones).' },
      { name: 'Gesture', description: 'refers to an interaction technique in which input is performed through bodily movements, where the system recognizes gesture forms, trajectories, or poses and maps them to commands or continuous controls (e.g., grasping, dragging, rotating, pointing, or pinching).' },
      { name: 'Gaze', description: 'refers to an interaction technique that uses eye gaze direction or fixation points as input signals, and is typically implemented using eye-tracking technologies.' },
      { name: 'Voice', description: 'refers to an interaction technique that uses spoken commands as input.' }
    ],
    'Interaction Function': [
      { name: 'Activation', description: 'refers to initiating an interface, function, or mode to bring it into an available or active state.' },
      { name: 'Selection', description: 'refers to choosing a target from multiple objects, controls, or options.' },
      { name: 'Manipulation', description: 'refers to performing control actions on a selected object or interface, such as moving, rotating, or scaling it.' }
    ],
    'Scenario': [
      { name: 'Algorithm performance', description: 'refers to a quantitative evaluations of the technical performance, typically using benchmarks to compare rendering speed or memory performance.' },
      { name: 'Qualitative result inspection', description: 'refers to an qualitative discussion of results that encourages readers to agree on a quality statement.' },
      { name: 'User performance', description: 'refers to an quantitative or qualitative evaluation of the performance of the users of a system. Typically, user performance is measured in experiments using time and correctness of users to complete as set of tasks.' },
      { name: 'User experience', description: 'refers to an examination of how a user reacts to inter-acting with a tool. Likert scale questionnaires for subjective feedback, and interviews are commonly used to gather data of user experience.' },
      { name: 'Understanding environment and work practices', description: 'refers to an examination to understand the implications of adopting a technique into a working environment. Common examples of data collection methods are surveys and interviews with expert users.' },
      { name: 'Team communication in MR/AR', description: 'refers to an assessment of the communicative value of a technique in regards to goals such as teaching or presentation.' },
      { name: 'Team collaboration in MR/AR', description: 'refers to an evaluation of the level of support of a technique to facilitate collaboration in a team.' }
    ],
    'Setting': [
      { name: 'Lab', description: 'refers to a research setting conducted in a laboratory or similarly controlled environment, where variables are controlled and conditions are reproducible.' },
      { name: 'Wild', description: 'refers to a research setting conducted in users\' real-world, everyday, or work environments, where interactions occur naturally in situ.' }
    ]
  }
  
  return (itemsData[subName] || []).map((item, idx) => ({
    id: idx + 1,
    ...item
  }))
}

const categories = ref(buildCategories())


const toggleCategory = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  if (category) {
    category.collapsed = !category.collapsed
  }
}
</script>

<style scoped>
.home-tab {
  width: 100%;
}

/* 整个Categorization区域的大框 */
.categorization-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 25px rgba(80, 100, 180, 0.3);
}

/* 主图区域 */
.home-main-image {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background: white;
  border-radius: 12px;
  margin-bottom: 40px;
  overflow: hidden;
}

.home-main-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

/* Categorization标题 */
.categorization-title {
  font-size: 28px;
  font-weight: 700;
  color: #000;
  margin-bottom: 30px;
  margin-left: 36px; /* 与一级标题矩形框左边对齐（toggle-icon 24px + gap 12px = 36px） */
}

/* 分类项 */
.category-item {
  margin-bottom: 25px;
}

/* 分类外层包装 - 包含icon和header */
.category-wrapper {
  display: flex;
  align-items: stretch;
  gap: 12px;
}

/* 展开/收缩图标 */
.toggle-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-top: 2px; /* 向下移动2px，使其与矩形框垂直居中 */
}

.toggle-icon.rotated {
  transform: rotate(-90deg);
}

.toggle-icon:hover {
  transform: scale(1.05);
}

.toggle-icon.rotated:hover {
  transform: rotate(-90deg) scale(1.05);
}

/* 一级标题区域：大圆角矩形（嵌套效果） */
.category-header {
  flex: 1;
  display: flex;
  align-items: stretch;
  padding: 0;
  border-radius: 50px;
  position: relative;
}

/* 可点击元素的hover效果 */
.clickable {
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 一级标题名称：小圆角矩形（嵌套在大矩形内） */
.category-name {
  font-size: 14px;
  font-weight: 600;
  padding: 4px 20px;
  border-radius: 50px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  z-index: 1;
  /* 阴影通过内联样式动态设置 */
}

/* 一级标题解释文字（在大矩形背景上） */
.category-description {
  flex: 1;
  font-size: 13px;
  line-height: 1.5;
  padding: 4px 20px;
  display: flex;
  align-items: center;
}

/* 可折叠内容区域 */
.category-content {
  padding: 20px 0 0 36px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 二级标题区域 */
.subcategory-item {
  margin-bottom: 30px;
}

.subcategory-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.subcategory-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  object-position: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.subcategory-text {
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.subcategory-name {
  font-weight: 700;
}

/* 三级标题容器 - 包含统一竖线 */
.tertiary-container {
  display: flex;
  gap: 12px;
  padding-left: 10px; /* 调整为0，与icon对齐 */
}

/* 统一的连贯竖线 */
.tertiary-line-unified {
  width: 3px;
  flex-shrink: 0;
  border-radius: 2px;
  align-self: stretch;
}

/* 三级标题列表 */
.tertiary-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

/* 三级标题项 */
.tertiary-item {
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.tertiary-icon {
  width: 34px;
  height: 34px;
  object-fit: contain;
  object-position: center;
  flex-shrink: 0;
}

/* 三级标题文本 */
.tertiary-text {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  display: block;
}

.tertiary-name {
  font-weight: 600;
}

/* ==================== 响应式设计 ==================== */

/* 桌面 (1200px - 1400px) */
@media screen and (max-width: 1400px) {
  .categorization-container {
    padding: 35px;
  }
  
  .categorization-title {
    font-size: 26px;
    margin-left: 32px;
  }
}

/* 小桌面 (1024px - 1200px) */
@media screen and (max-width: 1200px) {
  .categorization-container {
    padding: 30px;
    border-radius: 18px;
  }
  
  .categorization-title {
    font-size: 24px;
    margin-bottom: 25px;
    margin-left: 30px;
  }
  
  .category-item {
    margin-bottom: 20px;
  }
  
  .toggle-icon {
    width: 22px;
    height: 22px;
  }
  
  .category-name {
    font-size: 13px;
    padding: 4px 16px;
  }
  
  .category-description {
    font-size: 12px;
    padding: 4px 16px;
  }
  
  .category-content {
    padding: 15px 0 0 32px;
  }
  
  .subcategory-text {
    font-size: 13px;
  }
  
  .tertiary-text {
    font-size: 13px;
  }
}

/* 平板 (768px - 1024px) */
@media screen and (max-width: 1024px) {
  .categorization-container {
    padding: 25px;
    border-radius: 16px;
  }
  
  .home-main-image {
    min-height: 150px;
    margin-bottom: 30px;
  }
  
  .categorization-title {
    font-size: 22px;
    margin-bottom: 22px;
    margin-left: 28px;
  }
  
  .category-wrapper {
    gap: 10px;
  }
  
  .toggle-icon {
    width: 20px;
    height: 20px;
  }
  
  .category-header {
    border-radius: 40px;
  }
  
  .category-name {
    font-size: 12px;
    padding: 4px 14px;
    border-radius: 40px;
  }
  
  .category-description {
    font-size: 11px;
    padding: 4px 14px;
  }
  
  .category-content {
    padding: 12px 0 0 28px;
  }
  
  .subcategory-item {
    margin-bottom: 24px;
  }
  
  .subcategory-header {
    gap: 10px;
    margin-bottom: 16px;
  }
  
  .subcategory-icon {
    width: 22px;
    height: 22px;
  }
  
  .subcategory-text {
    font-size: 13px;
  }
  
  .tertiary-container {
    gap: 10px;
    padding-left: 8px;
  }
  
  .tertiary-text {
    font-size: 13px;
  }
  
  .tertiary-item {
    margin-bottom: 10px;
  }
}

/* 大手机 (576px - 768px) */
@media screen and (max-width: 768px) {
  .categorization-container {
    padding: 20px;
    border-radius: 14px;
  }
  
  .home-main-image {
    min-height: 120px;
    margin-bottom: 25px;
    border-radius: 10px;
  }
  
  .categorization-title {
    font-size: 20px;
    margin-bottom: 20px;
    margin-left: 0;
    text-align: center;
  }
  
  .category-item {
    margin-bottom: 18px;
  }
  
  .category-wrapper {
    gap: 8px;
    flex-direction: column;
    align-items: flex-start;
  }
  
  /* 手机端隐藏三角形图标 */
  .toggle-icon {
    display: none;
  }
  
  .category-header {
    width: 100%;
    border-radius: 30px;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    position: relative;
  }
  
  .category-name {
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 30px;
    margin-bottom: 6px;
  }
  
  .category-description {
    font-size: 11px;
    padding: 0 8px 4px 8px;
    line-height: 1.4;
  }
  
  .category-content {
    padding: 12px 0 0 0;
  }
  
  .subcategory-item {
    margin-bottom: 20px;
  }
  
  .subcategory-header {
    gap: 8px;
    margin-bottom: 14px;
  }
  
  .subcategory-icon {
    width: 20px;
    height: 20px;
  }
  
  .subcategory-text {
    font-size: 12px;
    line-height: 1.5;
  }
  
  .tertiary-container {
    gap: 8px;
    padding-left: 5px;
  }
  
  .tertiary-line-unified {
    width: 2px;
  }
  
  .tertiary-text {
    font-size: 12px;
    line-height: 1.5;
  }
  
  .tertiary-item {
    margin-bottom: 8px;
  }
}

/* 手机 (480px - 576px) */
@media screen and (max-width: 576px) {
  .categorization-container {
    padding: 15px;
    border-radius: 12px;
  }
  
  .home-main-image {
    min-height: 100px;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  
  .categorization-title {
    font-size: 18px;
    margin-bottom: 18px;
  }
  
  .category-item {
    margin-bottom: 15px;
  }
  
  .category-header {
    border-radius: 25px;
    padding: 8px;
  }
  
  .category-name {
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 25px;
    margin-bottom: 4px;
  }
  
  .category-description {
    font-size: 10px;
    padding: 0 6px 3px 6px;
  }
  
  .category-content {
    padding: 10px 0 0 0;
  }
  
  .subcategory-item {
    margin-bottom: 16px;
  }
  
  .subcategory-header {
    gap: 6px;
    margin-bottom: 12px;
  }
  
  .subcategory-icon {
    width: 18px;
    height: 18px;
  }
  
  .subcategory-text {
    font-size: 11px;
  }
  
  .tertiary-container {
    gap: 6px;
    padding-left: 3px;
  }
  
  .tertiary-text {
    font-size: 11px;
  }
  
  .tertiary-item {
    margin-bottom: 6px;
  }
}

/* 小手机 (<480px) */
@media screen and (max-width: 480px) {
  .categorization-container {
    padding: 12px;
    border-radius: 10px;
  }
  
  .home-main-image {
    min-height: 80px;
    margin-bottom: 15px;
  }
  
  .categorization-title {
    font-size: 16px;
    margin-bottom: 15px;
  }
  
  .category-item {
    margin-bottom: 12px;
  }
  
  .category-header {
    border-radius: 20px;
    padding: 6px;
  }
  
  .category-name {
    font-size: 10px;
    padding: 3px 8px;
    border-radius: 20px;
  }
  
  .category-description {
    font-size: 9px;
    padding: 0 5px 2px 5px;
  }
  
  .category-content {
    padding: 8px 0 0 0;
  }
  
  .subcategory-item {
    margin-bottom: 14px;
  }
  
  .subcategory-header {
    gap: 5px;
    margin-bottom: 10px;
  }
  
  .subcategory-icon {
    width: 16px;
    height: 16px;
  }
  
  .subcategory-text {
    font-size: 10px;
  }
  
  .tertiary-container {
    gap: 5px;
    padding-left: 2px;
  }
  
  .tertiary-text {
    font-size: 10px;
  }
  
  .tertiary-item {
    margin-bottom: 5px;
  }
}
</style>
