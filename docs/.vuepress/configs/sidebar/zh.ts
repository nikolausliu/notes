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
        '/advance/javascript-memory-model.md',
        '/advance/scope-chain.md',
        '/advance/garbage-collection.md',
        '/advance/event-loop.md',
        {
          text: '手写实现',
          children: [
            '/advance/handwriting/stack.md',
            '/advance/handwriting/promise.md',
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
      ],
    },
  ],
  '/blog': [
    {
      text: '博客',
      children: [
        '/blog/vite-envs.md',   
        '/blog/upgrade-axios.md',   
      ],
    },
  ],
}