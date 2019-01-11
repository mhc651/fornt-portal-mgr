/**
 * Created by TIMMY on 2018/4/25.
 */
import request from '@/utils/callApi';
import constant from './api';
// 发送手机验证码
export function sendCode(params) {
  return request(constant.COMMON_SEND_CODE, 'POST', params);
}
// 发送上传图片
export function uploadImage(params) {
  return request(constant.COMMON_UPLOAD_IMAGE, 'POST', params);
}
