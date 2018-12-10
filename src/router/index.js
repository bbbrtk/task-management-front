import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import NewUser from '@/components/newUser'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/new-user',
      name: 'newUser',
      component: NewUser
    }
    
  ]
})
