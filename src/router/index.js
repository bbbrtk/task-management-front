import Vue from 'vue'
import Router from 'vue-router'
import NewUser from '@/components/User/newUser'
import Users from '@/components/User/userList'
import Home from '@/components/home'
import EditUser from '@/components/User/EditUser'
import Projects from '@/components/Project/projectList'
import newProject from '@/components/Project/newProject'
import newTask from '@/components/Project/newTask'

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
      path :'users/:id',
      name: 'editUser',
      component: EditUser
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
    },
    {
      path: '/new-project',
      name: 'newProject',
      component: newProject
    },
    {
      path: '/new-task',
      name: 'newTask',
      component: newTask
    }
    
  ]
})
