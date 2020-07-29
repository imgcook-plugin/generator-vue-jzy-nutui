// 标识是否为生产环境
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const plugins = [];
if (IS_PROD) {
  plugins.push("transform-remove-console");
}

module.exports = {
  presets: [
    [
      "@vue/cli-plugin-babel/preset",
      {
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ],
  plugins: [
    ["@nutui/babel-plugin-separate-import", { style: "css" }],
    ...plugins
  ]
};
