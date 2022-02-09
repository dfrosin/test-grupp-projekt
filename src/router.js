import { createRouter, createWebHashHistory } from 'vue-router'

import AboutView from './views/AboutView.vue'
import ContactView from './views/ContactView.vue'
import HomeView from './views/HomeView.vue'
import GetStartedView from './views/GetStartedView.vue'
import CreateAccountView from './views/CreateAccountView.vue'
import LogInView from './views/LogInView.vue'
import DashboardView from './views/DashboardView.vue'
import ProfileView from './views/ProfileView.vue'
import CreateProductBacklogView from './views/CreateProductBacklogView.vue'
import CreateSprintView from './views/CreateSprintView.vue'
import SprintOverviewView from './views/SprintOverviewView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: AboutView,
      path: '/about'
    },
    {
      component: ContactView,
      path: '/contact/:id'
    },
    {
      component: HomeView,
      path: '/'
    },
    {
      component: GetStartedView,
      path: '/getstarted'
    },
    {
      component: CreateAccountView,
      path: '/createaccount'
    },
    {
      component: LogInView,
      path: '/login'
    },
    {
      component: DashboardView,
      path: '/dashboard'
    },
    {
      component: LogInView,
      path: '/login'
    },
    {
      component: ProfileView,
      path: '/profile'
    },
    {
      component: CreateProductBacklogView,
      path: '/createbacklog'
    },
    {
      component: CreateSprintView,
      path: '/createsprint'
    },
    {
      component: SprintOverviewView,
      path: '/sprint'
    }
  ]
})
