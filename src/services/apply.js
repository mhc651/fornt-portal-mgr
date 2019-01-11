/**
 * Created by TIMMY on 2018/4/25.
 */
import request from '@/utils/callApi';
import constant from './api';
// 企业申报第一次进入页面展示数据
export function into() {
  return request(constant.PROJECT_APPLY_INTO, 'POST');
}
// 企业申报第一次进入页面展示数据
export function find(body) {
  return request(constant.PROJECT_APPLY_QUERY, 'POST', body);
}
// 删除产品申报记录
export function remove(body) {
  return request(constant.PROJECT_APPLY_DELETE, 'POST', body);
}
// 获取产品分类
export function categories() {
  return request(constant.PROJECT_APPLY_CATEGORIES, 'POST');
}
// 企业申报数据保存
export function save(body) {
  return request(constant.PROJECT_APPLY_SUBMIT, 'POST', body);
}
// 企业申报详情页
export function detail({id}) {
  return request(constant.PROJECT_APPLY_DETAIL, 'POST', {projectApplyId: id});
}
// 产品申报提交
export function apply(ids) {
  return request(constant.PROJECT_PRODUCT_APPLY_SUBMIT, 'POST', {projectApplyId: ids});
}
// 下载模板
export function downTemplate() {
  return request(constant.DOWNLOAD_TEMPLATE, 'get', {});
}
// 上传基本信息
export function uploadExcel(body) {
  return request(constant.UPLOAD_EXCEL, 'post', body);
}
// 上传资质文件
export function uploadZIP(body) {
  return request(constant.UPLOAD_ZIP, 'post', body);
}

