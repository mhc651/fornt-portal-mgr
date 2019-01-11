/**
 * Created by TIMMY on 2018/4/24.
 */
export default {
  // login/logout
  LOGOUT: '/portal/api/auth/logout', // 退出 s
  // frame
  FRAME_QUERY: '/portalmgr/api/model/getframework', // 页面框架模型
  // 用于查询省市区列表
  TYPE_AREA:'/portal/pub/comm/area/list',
  // 企业列表
  ORG_INFO_LIST: '/portalmgr/api/user/orgInfoList',
  // 企业注册列表
  REGISTORG:'/portalmgr/api/org/pageOrgInfoData',
  // 注册信息审核页数据
  ORGINfO:'/portalmgr/api/org/orgInfoDetails',
  REVIEWAUDIT:'/portalmgr/api/org/audit',
  // 获取用户列表
  USER_LIST:'/portalmgr/api/user/pageOrgUserData',
  // 获取用户数据
  USER_INFO:'/portalmgr/api/user/userInfo',
  // 限制用户权限
  USER_DELETE:'/portalmgr/api/user/delete',
  // 开通用户权限
  USER_AUDIT:'/portalmgr/api/user/setUserAudit',
  // 添加或更新用户数据
  USER_UPDATE:'/portalmgr/api/user/saveOrUpdate',
  // 重置密码
  USER_RESET_PW:'/portalmgr/api/user/updatePwd',
  // 应用列表
  APP_LIST:'/portalmgr/api/app/pageAppData',
  // 应用信息
  APP_INFO:"/portalmgr/api/app/appDetails",
  // 应用信息更新
  APP_UPDATE:'/portalmgr/api/app/saveOrUpdate',
  // 应用开通记录
  APP_OPEN_LIST:'/portalmgr/api/app/pageOrgAppOpen',
  APP_OPEN_DATE:'/portalmgr/api/app/setOpenValidDate',
  // 导入文件
  DOWNLOAD_TEMPLATE: '/aup2org/api/project/apply/downLoadExcel', // 下载申报资质附件命名excel
  UPLOAD_EXCEL: '/aup2org/api/project/apply/uploadExcel', // 导入基本信息
  UPLOAD_ZIP: '/aup2org/api/project/apply/uploadZip', // 导入资质文件
  // common
  COMMON_SEND_CODE: '/portal/pub/comm/sendvcode', // 手机验证码
  COMMON_UPLOAD_IMAGE: '/portal/pub/comm/uploadimage', // 临时图片文件
  COMMON_UPLOAD_FILE: '/portal/pub/comm/uploadfile' ,// 临时文件
  // 应用类型
  TYPE_APP_ATTR:'/portalmgr/api/codeItem/proAppType',
};
