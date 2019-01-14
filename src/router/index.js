import Vue from 'vue'
import Router from 'vue-router'
import NewUser from '@/components/User/newUser'
import Users from '@/components/User/userList'
import Home from '@/components/home'
import Projects from '@/components/Project/projectList'
import newProject from '@/components/Project/newProject'
import newTask from '@/components/Project/newTask'
import Teams from '@/components/Team/teamList'
import newTeam from '@/components/Team/newTeam'
import Companies from '@/components/Company/companyList'

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
    },
    {
      path: '/new-project',
      name: 'newProject',
      component: newProject
    },
    {
      path: '/project/:projectId/new-task/',
      name: 'newTask',
      component: newTask
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams
    },
    {
      path: '/new-team',
      name: 'newTeam',
      component: newTeam
    },
    {
      path: '/companies',
      name: 'companies',
      component: Companies
    },
    
  ]
})
