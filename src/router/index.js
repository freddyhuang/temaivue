import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/LoginAndRegister/login'
import forgetPwd from '@/components/forgetPwd/forgetPwd'
import about from '@/components/about/about'


import GoodsList from '@/views/GoodsList'
import productsDetail from '@/views/productsDetail'
import readyOrder from '@/views/readyOrder'
import myorderHeader from '@/views/myorderHeader'
import myorder from '@/views/myorder'
import myredpack from '@/views/myredpack'
import userinfo from '@/views/userinfo'
import payorder from '@/views/payorder'
import paypass from '@/views/paypass'

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
      path: '/myorderHeader',
      name: 'myorderHeader',
      component: myorderHeader,
      children: [
        {path: '/',redirect:myorder},
        {path: 'myorder',component: myorder},
        {path: 'myredpack',component: myredpack},
        {path: 'userinfo',component: userinfo}
      ]
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
    },
    {
      path: '/paypass',
      name: 'paypass',
      component: paypass
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/payorder',
      name: 'payorder',
      component: payorder
    }
  ]
})
