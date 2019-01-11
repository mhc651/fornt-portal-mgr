import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

// 当从子级返回时读取历史
function tableStorage(to, form, next) {
  // 设置到导航
  store.dispatch('nowPath', to.path)
  let reg = new RegExp('^' + to.path + '/[a-z]', 'gi')
  // 详情也记录
  if (!form.path.match(reg)) {
    sessionStorage.removeItem('portalmgr' + to.path)
  }
  next()
}

const router = new Router({
  mode: 'history',
  base: 'portalmgr',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      alias: '/index.html',
      redirect: '/ZCSH002'
    },
    {
      path: '/ZCSH002',
      name: '注册管理',
      component: () => import('@/views/review/index'),
      beforeEnter: tableStorage
    },
    {
      path: '/ZCSH002/page/:id/:user',
      name: '注册详情页',
      component: () => import('@/views/review/data')
    },
    {
      path: '/ZCSH001',
      name: '用户管理',
      component: () => import('@/views/user/index'),
      beforeEnter: tableStorage
    },
    {
      path: '/ZCSH001/page/:id',
      name: '用户信息',
      component: () => import('@/views/user/data')
    },
    {
      path: '/ZCSH001/page/',
      name: '新增用户',
      component: () => import('@/views/user/data')
    },
    {
      path: '/ZCSH004',
      name: '应用管理',
      component: () => import('@/views/app/index'),
      beforeEnter: tableStorage
    },
    {
      path: '/ZCSH004/page/:id',
      name: '应用信息',
      component: () => import('@/views/app/data'),
      beforeEnter: tableStorage
    },
    {
      path: '/ZCSH004/page/',
      name: '新增应用',
      component: () => import('@/views/app/data'),
      beforeEnter: tableStorage
    },
    {
      path: '/ZCSH005',
      name: '开通记录',
      component: () => import('@/views/record/index'),
      beforeEnter: tableStorage
    }
    // {
    //   path: '/ma1/ma1b1',
    //   name: '企业申报',
    //   component: () => import('@/views/apply/index')
    // },
    // {
    //   path: '/ma1/detail/:id',
    //   name: '企业申报详情',
    //   component: () => import('@/views/apply/detail')
    // },
    // {
    //   path: '/ma1/edit/:id',
    //   name: '企业申报编辑',
    //   component: () => import('@/views/apply/edit')
    // },
    // {
    //   path: '/ma1/ma1b2',
    //   name: '产品申报',
    //   component: () => import('@/views/apply/product')
    // },
    // {
    //   path: '/ma1/registration/:registerCardNo',
    //   name: '注册证',
    //   component: () => import('@/views/registration/index')
    // }
  ]
})
router.beforeEach((to, from, next) => {
  const app = JSON.parse(sessionStorage.getItem('_token'))
  // 是否登录
  if (app) {
    // 修改title
    document.querySelector('title').innerText = to.name
    store.dispatch('setToken', app.accessToken)
    // if (to.path === `/ma1/ma1b1`) {
    //   // 查询是否初次进入
    //   store.dispatch('apply/into').then(payload => {
    //     if (payload.success) {
    //       if (payload.content && payload.content.data && payload.content.data.id != null) {
    //         alert();
    //         next({path: `/ma1/detail/${payload.content.data.id}`});
    //       } else {
    //         next();
    //       }
    //     }
    //   });
    // } else {
    //   next();
    // }
    next()
  } else {
    if (!window.location.host.match(/localhost/i)) {
      window.location.href = '/portal/login'
    }
  }
})
export default router
