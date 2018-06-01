import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/LoginAndRegister/login'
import forgetPwd from '@/components/forgetPwd/forgetPwd'


import GoodsList from '@/views/GoodsList'
import productsDetail from '@/views/productsDetail'
import readyOrder from '@/views/readyOrder'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd
    },
    {
      path: '/productsDetail',
      name: 'productsDetail',
      component: productsDetail
    },
    {
      path: '/readyOrder',
      name: 'readyOrder',
      component: readyOrder
    }
  ]
})
