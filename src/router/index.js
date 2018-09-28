import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      component: resolve => require(['../index.vue'], resolve),
      meta: {
        pageTitle: '主页',
        keepAlive: true
      }
    },
    {
      path: '/collect',
      component: resolve => require(['../collect.vue'], resolve),
      meta: {
        pageTitle: '收藏',
        keepAlive: false
      }
    },
    {
      path: '/content',
      component: resolve => require(['../content.vue'], resolve),
      meta: {
        pageTitle: '内容',
        keepAlive: false
      }
    },
    {
      path: '/conlist',
      component: resolve => require(['../conlist.vue'], resolve),
      meta: {
        pageTitle: '列表',
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../login.vue'], resolve),
      meta: {
        pageTitle: '登录',
        keepAlive: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['../search.vue'], resolve),
      meta: {
        pageTitle: '搜索',
        keepAlive: true
      }
    },
    {
      path: '/',
      redirect: function () {
        // if (store.store.state.isLoad === false) {
        //   return '/login'
        // } else {
        return '/index'
        // }
      }
    }
  ]
})
