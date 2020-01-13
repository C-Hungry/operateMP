var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APISERVER: '"http://tstapi.jdhui.com.cn/"',
  APICLIENT: '"http://tsthmmapp.jdhui.com.cn/"',
  UPLOADSERVER: '"http://tstpic.jdhui.com.cn/api/UploadFile/UploadFiles"'
})
