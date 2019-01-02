import Vue from 'vue'
import Router from 'vue-router'
import NewUser from '@/components/User/newUser'
import Users from '@/components/User/userList'
import Home from '@/components/home'
import Projects from '@/components/Project/projects'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/new-user',
      name: 'newUser',
      component: NewUser
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    }
    
  ]
})
