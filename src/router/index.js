import Vue from 'vue'
import Router from 'vue-router'
import NewUser from '@/components/User/newUser'
import Users from '@/components/User/userList'
import Home from '@/components/home'
import EditUser from '@/components/User/editUser'
import Projects from '@/components/Project/projectList'
import EditProject from '@/components/Project/editProject'
import newProject from '@/components/Project/newProject'
import newTask from '@/components/Project/newTask'
import editTask from '@/components/Project/editTask'
import Teams from '@/components/Team/teamList'
import newTeam from '@/components/Team/newTeam'
import editTeam from '@/components/Team/editTeam'
import Companies from '@/components/Company/companyList'
import Clients from '@/components/Client/clientList'
import newClient from '@/components/Client/newClient'

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
      path :'/users/:id',
      name: 'editUser',
      component: EditUser
    },
    {
      path :'/projects/:id',
      name: 'editProject',
      component: EditProject
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
      path :'/edit-task',
      name: 'editTask',
      component: editTask
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
      path :'/edit-team',
      name: 'editTeam',
      component: editTeam
    },
    {
      path: '/companies',
      name: 'companies',
      component: Companies
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients
    },
    {
      path: '/new-client',
      name: 'newClient',
      component: newClient
    },
    
  ]
})
