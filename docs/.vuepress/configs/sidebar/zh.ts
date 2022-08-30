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
      children: [
        '/blog/garbage-collection.md',
        '/blog/event-loop.md',
      ],
    },
  ],
}