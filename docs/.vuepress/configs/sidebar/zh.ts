import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/': [
    {
      text: '主页',
      children: [
        '/README.md',
      ],
    },
  ],
  '/advance': [
    {
      text: '进阶',
      // collapsible: true,
      children: [
        {
          text: '浏览器工作原理',
          children: [
            '/advance/how-browser-works/chrome-architecture-model.md'
          ]
        },
        '/advance/javascript-memory-model.md',
        '/advance/scope-chain.md',
        '/advance/object-class-extends.md',
        '/advance/garbage-collection.md',
        '/advance/event-loop.md',
        {
          text: '手写实现',
          children: [
            '/advance/handwriting/deepClone.md',
            '/advance/handwriting/stack.md',
            '/advance/handwriting/promise.md',
          ]
        },
        {
          text: '算法',
          children: [
            '/advance/algorithms/sort.md',
            '/advance/algorithms/dynamic-programming.md',
          ]
        },
        {
          text: '网络安全',
          children: [
            '/advance/security/authentication.md',
            '/advance/security/cross-domain.md',
          ]
        }
      ],
    },
  ],
  '/problems': [
    {
      text: '一题',
      // collapsible: true,
      children: [
        '/problems/01.md',
        '/problems/02.md',        
        '/problems/03.md',
        '/problems/04.md',        
        '/problems/05.md',        
      ],
    },
  ],
  '/blog': [
    {
      text: '博客',
      children: [
        '/blog/vite-envs.md',
        '/blog/upgrade-axios.md',
        '/blog/ant-design-vue-modal-feature.md'
      ],
    },
  ],
}