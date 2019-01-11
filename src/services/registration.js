/**
 * Created by TIMMY on 2018/4/25.
 */
import request from '@/utils/callApi';
import constant from './api';
// 注册证
export function detail(body) {
  return request(constant.REGISTRATION_DETAIL, 'POST', body);
}
// 组件
export function groupDetail(body) {
  return request(constant.REGISTRATION_GROUP_DETAIL, 'POST', body);
}

