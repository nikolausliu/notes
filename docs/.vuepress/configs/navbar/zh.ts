import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarZh: NavbarConfig = [
  {
    text: '主页',
    link: '/',
  },
  {
    text: '博客',
    children: [
      '/blog/garbage-collection.md',
      '/blog/event-loop.md',
    ]
  },
  // {
  //   text: 'Github',
  //   link: 'https://github.com/nikolausliu/notes'
  // }
]