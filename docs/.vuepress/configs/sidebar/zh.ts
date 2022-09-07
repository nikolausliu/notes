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
        '/advance/garbage-collection.md',
        '/advance/event-loop.md',
      ],
    },
  ],
  '/problems': [
    {
      text: '一题',
      // collapsible: true,
      children: [
        '/problems/01.md',
      ],
    },
  ],
}