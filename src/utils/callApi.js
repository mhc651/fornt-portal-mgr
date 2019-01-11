import axios from 'axios'
import iview from 'iview'
import store from '../store/index'
import Tip from '../assets/js/tip'

let tip = new Tip({})

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    const app = JSON.parse(sessionStorage.getItem('_token'))
    config.headers['accesstoken'] = app.accessToken // 让每个请求携带自定义token 请根据实际情况自行修改
    if (store.state.token.content) {
      config.headers['accesstoken'] = store.state.token.content
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    //var mhc1 = JSON.stringify(res);
    //console.log(mhc1);
    if (res.success == true) {
      return response.data
    } else if (res.errcode === '401') {
      tip.show({
        title: '系统提示',
        content: '登陆失效请重新登录',
        onOk() {
          window.location.href = '/portal/login'
        }
      })
      return  res
    } else {
      tip.show({
        title: '系统提示',
        content: res.errmsg,
      })
      return  res
    }
  },
  error => {
    iview.Modal.error({
      title: '系统错误',
      content: error
    })
    return Promise.reject(error)
  }
)
function callApi(url, method = 'GET', paramsObj) {
  // const $url = process.env.NODE_ENV === 'production' ? `http://gw.hxmec.com/portal/pub/${url}` : `${url}`;
  iview.LoadingBar.start()
  let opts = {
    url,
    method: method.toLocaleLowerCase()
  }
  switch (method.toUpperCase()) {
    case 'POST':
      opts = Object.assign({}, opts, {
        data: paramsObj
      })
      break
    case 'GET':
      opts = Object.assign({}, opts, {
        params: paramsObj
      })
      break
  }
  return service(opts).then(
    res => {
      iview.LoadingBar.finish()
      return Promise.resolve(res)
    },
    err => {
      iview.LoadingBar.error()
      console.log(err)
    }
  )
}

export default callApi
