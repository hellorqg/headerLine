import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint' // 引入第三方包 处理大数字

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
}) // 配置基础路径

// 请求拦截器
request.interceptors.request.use(config => {
  let { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}` // 统一注入token在请求头里
  }
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器

request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  } // 处理成功返回数据 不成功返回空对象
}] // 配置第三方数据

export default request
