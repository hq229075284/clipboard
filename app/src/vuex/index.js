import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    keyword: '',
    records: [],
  },
  mutations: {
    setRecords(state, nextRecords) {
      // 变更状态
      state.records = [...nextRecords]
    },
    setKeyword(state, keyword) {
      state.keyword = keyword
    },
  },
})
