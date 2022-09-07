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
  '/blog': [
    {
      text: '博客',
      collapsible: true,
      children: [
        '/blog/garbage-collection.md',
        '/blog/event-loop.md',
      ],
    },
  ],
  '/problems': [
    {
      text: '一题',
      collapsible: true,
      children: [
        '/problems/01.md',
      ],
    },
  ],
}