const HtmlWebpackPlugin = require('html-webpack-plugin')

const port = process.env.PORT || 9000

module.exports = {
  entry: './index.js',
  output: {
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  devServer: {
    host: 'local.dp-admin.test.shopee.io',
    port: port,
    historyApiFallback: true,
    open: false,
    hot: false,
    hotOnly: false,
    inline: false,
  },
}
