// .storybook/main.js|ts
const { mergeConfig } = require("vite");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "@storybook/builder-vite", // 👈生成器在这里启用.
  },
  async viteFinal(config) {
    //将自定义配置合并到默认配置中
    return mergeConfig(config, {
      //使用与您的应用相同的“解析”配置
      resolve: (await import("../vite.config.js")).default.resolve,
      //添加依赖预优化
      optimizeDeps: {
        include: ["storybook-dark-mode"],
      },
    });
  },
};
