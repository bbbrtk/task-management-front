import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import NewUser from '@/components/User/newUser'
import MainUser from '@/components/User/userList'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'userList',
      component: MainUser
    },
    {
      path: '/new-user',
      name: 'newUser',
      component: NewUser
    }
    
  ]
})
