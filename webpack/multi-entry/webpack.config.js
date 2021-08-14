const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    bundle1: './src/index1.js',
    bundle2: './src/index2.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      /**
        * initial 入口 chunk，对于异步导入的文件不处理
          async 异步 chunk，只对异步导入的文件处理
          all 全部 chunk
        */

      // 缓存分组
      cacheGroups: {
        // 公共的模块
        common: {
          name: 'common', // chunk 名称
          priority: 0, // 优先级
          minSize: 0, // 公共模块的大小限制
          minChunks: 2, // 公共模块最少复用过几次，引用两次及以上，把公共模块拆分
        },
      },
    },
  },
  // output: {
  //   path: path.join(__dirname, 'dist'),
  //   filename: 'main.js'
  // },
  // devServer: {
  //   hot: true,
  //   contentBase: path.join(__dirname, 'dist')
  // },
  // plugins: [
  //   new htmlWebpackPlugin({
  //     template: './src/index.html',
  //     filename: 'index.html'
  //   }),
  //   new webpack.HotModuleReplacementPlugin()
  // ]
}
