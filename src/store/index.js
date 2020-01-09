import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/Utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user') // 包含用户token信息的对象
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem('user', data)
    }

  },
  actions: {
  },
  modules: {
  }
})
