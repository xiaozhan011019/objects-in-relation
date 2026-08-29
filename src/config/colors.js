/**
 * 颜色配置文件
 * 基于 color-table.md 定义的颜色方案
 */

/**
 * 拼接 public 资源的访问路径。
 * 部署在子路径（如 GitHub Pages 项目页 https://user.github.io/repo/）时，
 * 绝对路径引用（/xxx）不会被 Vite 自动加上 base 前缀，必须手动拼接。
 * 所有 public 目录下的资源引用都应通过本函数处理。
 */
export const withBase = (path) => {
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/$/, '') + path
}

// 背景颜色
export const bgColor = '#EBEFFF';

// Time Filter 颜色
export const timeFilterColor = '#7B9CEE';

// 分类颜色配置
const legacyCategoryColors = {
  'Display representation': {
    primaryTextColor: '#341B8F',
    primaryBgColor: '#B5ACD7',
    primaryDescBgColor: '#CDC8DF',
    filterTextColor: '#341B8F',
    subcategories: {
      'Display Form': {
        secondaryTextColor: '#4E2C78',
        tertiaryColor: '#9B78CA',
        filterTextColor: '#75599A',
        filterTagBgColor: '#F4ECFF',
        icon: '/icons/display-form.svg'
      },
      'Display Information': {
        secondaryTextColor: '#4C66A8',
        tertiaryColor: '#799CE5',
        filterTextColor: '#7E97CB',
        filterTagBgColor: '#EBF1FF',
        icon: '/icons/display-info.svg'
      }
    }
  },
  'Spatial Organization': {
    primaryTextColor: '#365014',
    primaryBgColor: '#C5D0B7',
    primaryDescBgColor: '#DFE5D7',
    filterTextColor: '#375014',
    subcategories: {
      'Anchoring': {
        secondaryTextColor: '#5F7536',
        tertiaryColor: '#98B86F',
        filterTextColor: '#607F36',
        filterTagBgColor: '#E7F4D7',
        icon: '/icons/anchoring.svg'
      },
      'Layout': {
        secondaryTextColor: '#53948B',
        tertiaryColor: '#8BBEB7',
        filterTextColor: '#54948B',
        filterTagBgColor: '#E4EFED',
        icon: '/icons/layout.svg'
      }
    }
  },
  'Generation and Update Strategy': {
    primaryTextColor: '#6D4915',
    primaryBgColor: '#DFC9AC',
    primaryDescBgColor: '#EDE1D1',
    filterTextColor: '#6D4915',
    subcategories: {
      'Creation Method': {
        secondaryTextColor: '#C16328',
        tertiaryColor: '#E49162',
        filterTextColor: '#C16227',
        filterTagBgColor: '#FFEFE5',
        icon: '/icons/creation.svg'
      },
      'Driving Mechanism': {
        secondaryTextColor: '#C29644',
        tertiaryColor: '#E5BF78',
        filterTextColor: '#C29644',
        filterTagBgColor: '#FBFAE8',
        icon: '/icons/driving.svg'
      }
    }
  },
  'Interaction Method': {
    primaryTextColor: '#791C7E',
    primaryBgColor: '#CEAED0',
    primaryDescBgColor: '#E4D2E5',
    filterTextColor: '#791C7E',
    subcategories: {
      'Interaction Modality': {
        secondaryTextColor: '#B86D9F',
        tertiaryColor: '#D893CC',
        filterTextColor: '#D893CC',
        filterTagBgColor: '#F9F0F5',
        icon: '/icons/modality.svg'
      },
      'Interaction Function': {
        secondaryTextColor: '#9C4C4C',
        tertiaryColor: '#B86D82',
        filterTextColor: '#914577',
        filterTagBgColor: '#FFEEEE',
        icon: '/icons/function.svg'
      }
    }
  },
  'Evaluation Method': {
    primaryTextColor: '#636363',
    primaryBgColor: '#C7C7C7',
    primaryDescBgColor: '#E0E0E0',
    filterTextColor: '#636363',
    subcategories: {
      'Scenario': {
        secondaryTextColor: '#97A0B4',
        tertiaryColor: '#AAB2C5',
        filterTextColor: '#97A0B4',
        filterTagBgColor: '#ECEEF2',
        icon: '/icons/scenario.svg'
      },
      'Setting': {
        secondaryTextColor: '#82848B',
        tertiaryColor: '#9094A1',
        filterTextColor: '#7B7F8C',
        filterTagBgColor: '#E7E7EA',
        icon: '/icons/setting.svg'
      }
    }
  }
};

export const categoryColors = {
  'Entity Resources': {
    primaryTextColor: '#315E59', primaryBgColor: '#D8EEEA', primaryDescBgColor: '#EAF7F4', filterTextColor: '#315E59',
    subcategories: {
      'A1 Physical Form': { secondaryTextColor: '#477A74', tertiaryColor: '#8BBEB7', filterTextColor: '#477A74', filterTagBgColor: '#E7F3F1', icon: '/icons/a1-physical-form.png' },
      'A2 Digital Semantic Resources': { secondaryTextColor: '#5E7A3F', tertiaryColor: '#98B86F', filterTextColor: '#5E7A3F', filterTagBgColor: '#EEF5E6', icon: '/icons/a2-digital-semantic-resources.png' }
    }
  },
  'Relational Composition': {
    primaryTextColor: '#345785', primaryBgColor: '#DCEAF7', primaryDescBgColor: '#EDF5FC', filterTextColor: '#345785',
    subcategories: {
      'B1 Role Configuration': { secondaryTextColor: '#3977A2', tertiaryColor: '#8AC7EF', filterTextColor: '#3977A2', filterTagBgColor: '#E7F5FD', icon: '/icons/b1-role-configuration.png' },
      'B2 Spatial Constraint': { secondaryTextColor: '#3F63B0', tertiaryColor: '#7A9DEE', filterTextColor: '#3F63B0', filterTagBgColor: '#EAF0FD', icon: '/icons/b2-spatial-constraint.png' },
      'B3 Relational Logic': { secondaryTextColor: '#5555AE', tertiaryColor: '#9696F1', filterTextColor: '#5555AE', filterTagBgColor: '#EFEFFE', icon: '/icons/b3-relational-logic.png' }
    }
  },
  'Interaction Dynamics': {
    primaryTextColor: '#754267', primaryBgColor: '#EED9E9', primaryDescBgColor: '#F8EEF5', filterTextColor: '#754267',
    subcategories: {
      'C1 Control Allocation': { secondaryTextColor: '#98538F', tertiaryColor: '#D893CC', filterTextColor: '#98538F', filterTagBgColor: '#F8EAF5', icon: '/icons/c1-control-allocation.png' },
      'C2 Interaction Continuity': { secondaryTextColor: '#82446E', tertiaryColor: '#B86D9F', filterTextColor: '#82446E', filterTagBgColor: '#F5E8F0', icon: '/icons/c2-interaction-continuity.png' }
    }
  },
  'Interaction Display': {
    primaryTextColor: '#7B4E22', primaryBgColor: '#F2DFC5', primaryDescBgColor: '#FBF3E7', filterTextColor: '#7B4E22',
    subcategories: {
      'D1 Feedback Placement': { secondaryTextColor: '#98532F', tertiaryColor: '#D08255', filterTextColor: '#98532F', filterTagBgColor: '#F8ECE6', icon: '/icons/d1-feedback-placement.png' },
      'D2 Feedback Form': { secondaryTextColor: '#95702F', tertiaryColor: '#E5BF78', filterTextColor: '#95702F', filterTagBgColor: '#FAF3E5', icon: '/icons/d2-feedback-form.png' },
      'D3 Feedback Persistence': { secondaryTextColor: '#A64B22', tertiaryColor: '#E16E38', filterTextColor: '#A64B22', filterTagBgColor: '#FCEAE2', icon: '/icons/d3-feedback-persistence.png' },
      'D4 Feedback Modality': { secondaryTextColor: '#A56B16', tertiaryColor: '#F9B54E', filterTextColor: '#A56B16', filterTagBgColor: '#FFF3DF', icon: '/icons/d4-feedback-modality.png' }
    }
  }
};

// 获取标签的背景颜色
export function getTagBgColor(subcategoryName) {
  for (const category of Object.values(categoryColors)) {
    if (category.subcategories && category.subcategories[subcategoryName]) {
      return category.subcategories[subcategoryName].filterTagBgColor;
    }
  }
  return '#F0F0F0'; // 默认颜色
}

// 获取标签的文字颜色
export function getTagTextColor(subcategoryName) {
  for (const category of Object.values(categoryColors)) {
    if (category.subcategories && category.subcategories[subcategoryName]) {
      return category.subcategories[subcategoryName].filterTextColor;
    }
  }
  return '#333333'; // 默认颜色
}

// 获取二级分类的图标路径
export function getSubcategoryIcon(subcategoryName) {
  for (const category of Object.values(categoryColors)) {
    if (category.subcategories && category.subcategories[subcategoryName]) {
      return category.subcategories[subcategoryName].icon;
    }
  }
  return withBase('/icons/default.svg');
}

// 部署在子路径时，给所有图标路径自动补上 base 前缀
Object.values(categoryColors).forEach((category) => {
  Object.values(category.subcategories).forEach((sub) => {
    if (sub.icon) sub.icon = withBase(sub.icon);
  });
});

// 获取一级分类的颜色配置
export function getCategoryColors(categoryName) {
  return categoryColors[categoryName] || null;
}

// 获取二级分类的颜色配置
export function getSubcategoryColors(subcategoryName) {
  for (const category of Object.values(categoryColors)) {
    if (category.subcategories && category.subcategories[subcategoryName]) {
      return category.subcategories[subcategoryName];
    }
  }
  return null;
}

// 标签分类映射（二级标题 -> 一级标题）
export const subcategoryToCategory = {
  'A1 Physical Form': 'Entity Resources',
  'A2 Digital Semantic Resources': 'Entity Resources',
  'B1 Role Configuration': 'Relational Composition',
  'B2 Spatial Constraint': 'Relational Composition',
  'B3 Relational Logic': 'Relational Composition',
  'C1 Control Allocation': 'Interaction Dynamics',
  'C2 Interaction Continuity': 'Interaction Dynamics',
  'D1 Feedback Placement': 'Interaction Display',
  'D2 Feedback Form': 'Interaction Display',
  'D3 Feedback Persistence': 'Interaction Display',
  'D4 Feedback Modality': 'Interaction Display'
};

// 所有二级分类（标签类别）列表
export const allSubcategories = [
  'A1 Physical Form', 'A2 Digital Semantic Resources', 'B1 Role Configuration',
  'B2 Spatial Constraint', 'B3 Relational Logic', 'C1 Control Allocation',
  'C2 Interaction Continuity', 'D1 Feedback Placement', 'D2 Feedback Form',
  'D3 Feedback Persistence', 'D4 Feedback Modality'
];

// 按一级分类组织的二级分类
export const categorizedSubcategories = [
  { name: 'Entity Resources', subcategories: ['A1 Physical Form', 'A2 Digital Semantic Resources'] },
  { name: 'Relational Composition', subcategories: ['B1 Role Configuration', 'B2 Spatial Constraint', 'B3 Relational Logic'] },
  { name: 'Interaction Dynamics', subcategories: ['C1 Control Allocation', 'C2 Interaction Continuity'] },
  { name: 'Interaction Display', subcategories: ['D1 Feedback Placement', 'D2 Feedback Form', 'D3 Feedback Persistence', 'D4 Feedback Modality'] }
];
