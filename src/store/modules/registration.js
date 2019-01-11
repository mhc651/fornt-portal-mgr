/**
 * Created by TIMMY on 2018/4/25.
 */
import {detail, groupDetail} from '@/services/registration';
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    detail({commit}, params) {
      return detail(params);
    },
    group({commit}, params) {
      return groupDetail(params);
    }
  }
};
