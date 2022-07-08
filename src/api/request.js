import axios from 'axios'
import Momery from '../util/Momery'
import { ElNotification } from 'element-plus'
import Debounce from '../util/Debounce'
import { useRouter } from 'vue-router'
import store from '@/util/Vuex'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
})

/*请求前数据处理 */
request.interceptors.request.use(
  (config) => {
    config.headers['X-Token'] = Momery.get('token') //如果本地有token则请求的时候带上
    config.headers['X-Id'] = Momery.get('id') //如果本地有token则请求的时候带上
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
/*响应结果拦截 */
request.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.code == 888) {
      Debounce('netWork', 10000).then(_ => {
        ElNotification({
          title: '登录过期',
          message: '您的登录过期啦，请重新登录',
          type: 'error',
          duration: 5000
        })
        store.commit('login_out')
        const router = useRouter()
        router.replace('/login')
      }).catch(_ => {
      })
    }
    return data
  },
  (error) => {
    Debounce('netWork', 10000)
      .then((e) => {
        ElNotification({
          title: '网络错误',
          message: '请求服务器超时、请重试发起请求',
          type: 'error',
          duration: 5000
        })
      })
      .catch((e) => console.log('网络错误'))
    return Promise.reject({
      code: 404,
      msg: '网络错误'
    })
  }
)
export default request
