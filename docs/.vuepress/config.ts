import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { navbarZh, sidebarZh } from './configs/index.js'
import vuepressPluginAnchorRight from 'vuepress-plugin-anchor-right'

export default defineUserConfig({
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '前端进阶笔记',
      description: '记录我的学习过程',
    },
  },

  theme: defaultTheme({
    // logo: 'https://vuejs.org/images/logo.png',
    locales: {
      '/': {
        repo: 'nikolausliu/notes',
        navbar: navbarZh,
        sidebar: sidebarZh,
        sidebarDepth: 0,
        editLink: false,
        contributors: false,
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        // a11y
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏',
      }
    }
  }),
  plugins: [
    [vuepressPluginAnchorRight()]
    // {
    //   name: 'vuepress-plugin-right-anchor',
    // }
  ]
})