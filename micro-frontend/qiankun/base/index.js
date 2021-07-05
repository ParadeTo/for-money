import {registerMicroApps, start} from 'qiankun'

registerMicroApps([
  {
    name: 'app1',
    entry: '//local.dp-admin.test.shopee.io:8001/',
    container: '#app1',
    activeRule: '/id/ls',
  },
  // {
  //   name: 'app2',
  //   entry: '//localhost:9002',
  //   container: '#app2',
  //   activeRule: '/app2',
  // },
])
// 启动 qiankun
start()
