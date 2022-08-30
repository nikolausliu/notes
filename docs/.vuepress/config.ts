import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { navbarZh, sidebarZh } from './configs/index.js'

export default defineUserConfig({
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '刘同学的前端笔记',
      description: '记录我的学习过程',
    },
  },

  theme: defaultTheme({
    // logo: 'https://vuejs.org/images/logo.png',
    locales: {
      '/': {
        navbar: navbarZh,
        sidebar: sidebarZh,
      }
    }
  })
})