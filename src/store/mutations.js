import * as types from './mutations-types'
const mutations = {
  [types.GET_PAGE_MODEL](state, payload) {
    state.pageModel = payload.content
  },
  // 登出
  [types.LOGOUT](state, payload) {
    sessionStorage.removeItem('_token')
    localStorage.removeItem('vuex')
    window.location.href = '/portal/login'
  },
  [types.GET_TOKEN](state, payload) {
    state.token = payload
  },
  [types.GET_INIT_INTODATA](state, payload) {
    state.initIntoData = payload.content
  },
  [types.SET_PATH](state, payload) {
    state.nav = payload.content
  },
  ['set_app_loading'](state, payload) {
    if (payload.content === false) {
      // 给浏览器渲染的时间
      setTimeout(function() {
        state.appLoading = payload.content
      }, 300)
    } else {
      state.appLoading = payload.content
    }
  }
}
export default mutations
