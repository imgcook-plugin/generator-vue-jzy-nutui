const BASE_URL = process.env.NODE_ENV === "production" ? "//" : "/";
// const px2rem = require("postcss-px2rem");

// const postcss = px2rem({
//   remUnit: 75 // 基准大小 baseSize，需要和rem.js中相同
// });
process.env.VUE_APP_VERSION = require("./package.json").version;
const CompressionPlugin = require("compression-webpack-plugin");
const JavaScriptObfuscator = require("webpack-obfuscator");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  devServer: {
    clientLogLevel: "trace",
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    // host: "192.168.1.101",
    host: "0.0.0.0",
    port: 8066,
    https: false,
    hot: true,
    hotOnly: false
    /* 使用代理 */
    // proxy: {
    //   "/api": {
    //     target: "http://kkxefsfee.com",
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "/api": ""
    //     }
    //   }
    // }
  },
  // baseUrl: BASE_URL, // 从 Vue CLI 3.3 起已弃用
  publicPath: BASE_URL,
  outputDir: "dist",
  assetsDir: "assets", // 放置生成的静态资源目录

  lintOnSave: process.env.NODE_ENV !== "production",
  // todo: 无法识别chainWebpack???
  chainWebpack: config => {
    config.entry("main").add("@babel/polyfill"); // main是入口js文件
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      console.info(config);
      config.optimization.minimize = true;
      let optimization = new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      });
      config.optimization.minimizer = [optimization];

      // 为生产环境修改配置...
      config.mode = "production";
      let extPlugins = [
        new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 800,
          minRatio: 0.8,
          deleteOriginalAssets: false
        }),
        new CompressionPlugin({
          filename: "[path].br[query]",
          algorithm: "brotliCompress",
          test: /\.(js|css|html|svg)$/,
          compressionOptions: { level: 11 },
          threshold: 800, // 阈值
          minRatio: 0.8,
          deleteOriginalAssets: false
        }),
        // ,
        // new BundleAnalyzerPlugin()
        new JavaScriptObfuscator(
          {
            rotateUnicodeArray: true
          },
          []
        )
      ];
      config.plugins = [...config.plugins, ...extPlugins];
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
    // Object.assign(config, {
    //   // 开发生产共同配置
    //   resolve: {
    //     alias: {
    //       "@": path.resolve(__dirname, "./src"),
    //       "@c": path.resolve(__dirname, "./src/components"),
    //       "@p": path.resolve(__dirname, "./src/pages")
    //     } // 别名配置
    //   }
    // });
    config.plugins = [...config.plugins];
  },
  productionSourceMap: false, // 打包时不生成.map文件
  css: {
    sourceMap: false,
    loaderOptions: {
      css: {
        // 对于import 导入的css 文件也autoPrefix
        importLoaders: 1
      },
      less: {
        modifyVars: {},
        javascriptEnabled: true,
        importLoaders: 1
      },
      postcss: {
        // plugins: [postcss]
        plugins: [
          // https://www.npmjs.com/package/postcss-pxtorem
          // require("postcss-pxtorem")({
          //   rootValue: 32, // 换算的基数
          //   unitPrecision: 8,
          //   propList: ['*'],
          //   mediaQuery: false,
          //   minPixelValue: 0,
          // })
        ]
      }
    }
  }
};
