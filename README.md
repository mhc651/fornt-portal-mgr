# 平台统一路口运用
> A Vue.js project

## 项目文件结构
* components 组件文件夹
* views 主页面文件夹
  + login 登录页面
  + register 注册页面
  + RegisterSuccess 注册成功
  + NewPassWord 忘记密码
  + ReviewIng 审核中
  + RegistraterFailed 未通过审核
  + AuditCheck 待审核
* store vuex文件
  + actions.js vuex 异步事件 发起请求集合
  + index.js vuex config
  + mutations-types.js vuex 同步事件名称
  + rootState.js 全局状态
* router 路由文件
* utils 统一接口

## 框架
* vue 
* vuex 数据状态管理库
* vue-router vue路由库
* iview UI框架
* whatwg-fetch 异步接口



## 工具库
* webpack 前端构造脚手架 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
