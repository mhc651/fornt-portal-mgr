import callApi from '../utils/callApi'
import * as types from './mutations-types'
import api from '../services/api'
import * as services from '../services/common'
import { Promise } from 'es6-promise'
const actions = {
  // 框架信息
  getPageModel({ commit }, payload) {
    return callApi(api.FRAME_QUERY, 'POST', {}).then(res => {
      if (res && res.success) {
        commit({
          type: types.GET_PAGE_MODEL,
          content: res.content
        })
      }
    })
  },
  getInitIntoData({ commit }, payload) {
    return callApi(api.PROJECT_APPLY_INTO, 'POST', {}).then(res => {
      if (res && res.success) {
        commit({
          type: types.GET_INIT_INTODATA,
          content: res.content
        })
      }
    })
  },
  // 登出
  logout({ commit }, payload) {
    return callApi(api.LOGOUT, 'POST').then(res => {
      if (res && res.success) {
        commit({
          type: types.LOGOUT,
          content: res.content
        })
      }
    })
  },
  /**
   * 验证码
   * @param {*} param0
   * @param {*} payload
   */
  sendCode({ commit }, payload) {
    return services.sendCode(payload)
  },
  /**
   * 上传图片
   * @param {*} param0
   * @param {*} payload
   */
  uploadImage({ commit }, payload) {
    return services.uploadImage(payload)
  },
  setToken({ commit }, payload) {
    commit(types.GET_TOKEN, payload)
  },  // 获取注册列表
  registered({ commit }, payload) {
    return callApi(api.REGISTORG, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 审核通过 REVIEWAUDIT
  registeredAudit({}, payload) {
    return callApi(api.REVIEWAUDIT, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 获取企业信息
  orgInfo({}, payload) {
    return callApi(api.ORGINfO, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 获得用户列表
  userList({}, payload) {
    return callApi(api.USER_LIST, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  }, // 获得用户数据
  userInfo({}, payload) {
    return callApi(api.USER_INFO, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 批量限制用户权限
  userDelete({}, payload) {
    return callApi(api.USER_DELETE, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  /**
   * 开通用户权限
   * @param {} param0 
   * @param {*} payload 
   */
  userAudit({}, payload) {
    return callApi(api.USER_AUDIT, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 更新用户数据
  userUpdate({}, payload) {
    return callApi(api.USER_UPDATE, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  /**
   * 重置密码
   * @param {} param0 state
   * @param {*} payload param
   */
  userResetPw({}, payload) {
    return callApi(api.USER_RESET_PW, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  /**
   * 应用开通记录
   * @param {*} param0 
   * @param {*} payload 
   */
  appOpenList({}, payload) {
    return callApi(api.APP_OPEN_LIST, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  /**
   * 提交开通时间
   * @param {*} param0 
   * @param {*} payload 
   */
  appOpenDate({}, payload) {
    return callApi(api.APP_OPEN_DATE, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  /**
   * 项目列表
   *
   */
  appList({}, payload) {
    return callApi(api.APP_LIST, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  /**
   * 项目列表
   *
   */
  appInfo({}, payload) {
    return callApi(api.APP_INFO, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  /**
   * 项目列表
   *
   */
  appUpdate({}, payload) {
    return callApi(api.APP_UPDATE, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 设置当前地址
  nowPath({ commit }, payload) {
    commit({
      type: types.SET_PATH,
      content: payload
    })
  },
  /**
   * 获取企业列表
   * @param {*} param0
   * @param {*} payload  orgName:企业名称（模糊搜索，可以不传
   */
  typeOrgList({}, payload) {
    return callApi(api.ORG_INFO_LIST, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  /**
   * 用于查询省市区列表
   * @param {*} param0
   * @param {*} payload  orgName:企业名称（模糊搜索，可以不传
   */
  typeAreaList({}, payload) {
    return callApi(api.TYPE_AREA, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  /**
   * 应用类型
   * @param {*} param0
   * @param {*} payload
   */
  typeAppAttr({}, payload) {
    return callApi(api.TYPE_APP_ATTR, 'POST', payload).then(res => {
      if (res && res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  }
}

export default actions
