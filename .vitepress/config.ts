// https://vitepress.dev/reference/site-config
import { defineConfig } from "vitepress";
// https://vitepress-sidebar.cdget.com/zhHans/guide/getting-started
import { generateSidebar } from "vitepress-sidebar";

const commonSidebarConfig = {
  documentRootPath: "/docs",
  collapsed: true,
  collapseDepth: 2,
  sortFolderTo: "bottom",
  // 	useTitleFromFileHeading: true,
  // 	useTitleFromFrontmatter: true,
  // 	useFolderTitleFromIndexFile: true,
  // 	sortMenusByFrontmatterOrder: true
};

export default defineConfig({
  srcDir: "./docs",
  srcExclude: ["**/README.md"],
  outDir: "./public",
  title: "Maker Note",
  description: "Maker is making",
  lang: "zh-CN",
  // head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com/wraphex" }],
    search: {
      provider: "local",
    },
    footer: {
      copyright:
        'Copyright © 2021-2026 <a href="https://github.com/wraphex">wraphex</a>',
    },
    langMenuLabel: "切换语言",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "浅色模式",
    darkModeSwitchTitle: "深色模式",
    sidebarMenuLabel: "专栏列表",
    outline: { level: [2, 3], label: "目录" },
    returnToTopLabel: "返回顶部",
    editLink: {
      pattern: "https://github.com/wraphex/docs/edit/main/docs/:path",
      text: "编辑此页",
    },
    lastUpdated: { text: "更新于" },
    docFooter: { prev: "上一篇", next: "下一篇" },
    nav: [
      { text: "Android", link: "/Android" },
      { text: "ArchLinux", link: "/ArchLinux" },
      { text: "NAS", link: "/NAS" },
      { text: "OpenWRT", link: "/OpenWRT" },
      { text: "Misc", link: "/Misc" },
    ],
    sidebar: generateSidebar([
      {
        ...commonSidebarConfig,
        scanStartPath: "Android",
        resolvePath: "/Android/",
      },
      {
        ...commonSidebarConfig,
        scanStartPath: "ArchLinux",
        resolvePath: "/ArchLinux/",
      },
      {
        ...commonSidebarConfig,
        scanStartPath: "NAS",
        resolvePath: "/NAS/",
      },
      {
        ...commonSidebarConfig,
        scanStartPath: "OpenWRT",
        resolvePath: "/OpenWRT/",
      },
      {
        ...commonSidebarConfig,
        scanStartPath: "Misc",
        resolvePath: "/Misc/",
      },
    ]),
  },
});
