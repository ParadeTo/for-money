const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './index.js'),
  externalsType: 'script',
  externals: {
    jquery: ['https://code.jquery.com/jquery-3.1.0.js', 'jQuery'],
  },
}
