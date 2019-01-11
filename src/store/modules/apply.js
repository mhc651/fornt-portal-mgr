/**
 * Created by TIMMY on 2018/4/25.
 */
import {into, find, remove, categories, save, detail, downTemplate, uploadExcel, uploadZIP} from '@/services/apply';
export default {
  namespaced: true,
  state: {
    into: null
  },
  mutations: {
    SET_INTO: (state, into) => {
      state.into = into;
    }
  },
  actions: {
    into({commit}, params) {
      return new Promise((resolve, reject) => {
        into(params).then(payload => {
          if (payload) {
            commit('SET_INTO', !!(payload.success && payload.content));
          }
          return resolve(payload);
        });
      });
    },
    find({commit}, params) {
      return find(params);
    },
    remove({commit}, params) {
      return remove(params);
    },
    categories({commit}, params) {
      return categories(params);
    },
    save({commit}, params) {
      console.log(params);
      return save(params);
    },
    detail({commit}, params) {
      return detail(params);
    },
    downTemplate({commit}, params) {
      return downTemplate(params);
    },
    uploadExcel({commit}, params) {
      return uploadExcel(params);
    },
    uploadZIP({commit}, params) {
      return uploadZIP(params);
    }
  }
};
