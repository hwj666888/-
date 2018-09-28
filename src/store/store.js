import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

const store = new vuex.Store({
  state: {
    isLoad: false,
    user: '',
    url: process.env.API_HOST

  },
  mutations: {
    change (state) {
      state.isLoad = true
    },
    user (state, name) {
      state.user = name
    }
  }
})
export default {
  store
}
