// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Header, Search, cell, InfiniteScroll } from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store/store'
import jsonp from 'vue-jsonp'
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component(Search.name, Search)
Vue.component(cell.name, cell)
Vue.use(InfiniteScroll)
Vue.use(jsonp)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
/* 路由守卫 */
router.beforeEach((to, from, next) => {
  const nextUrl = ['/index', '/', '/conlist', '/collect', '/content', '/search', '']
  if (nextUrl.indexOf(to.path) !== -1) {
    if (store.store.state.isLoad === true) {
      console.log('用户已登录')
      next()
    } else {
      console.log('用户没登录')
      next({path: '/login'})
    }
  } else {
    next()
  }
})
