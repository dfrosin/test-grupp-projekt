import { createRouter, createWebHashHistory } from 'vue-router'

import AboutView from './views/firebaseView.vue'
import ContactView from './views/ContactView.vue'
import GetStartedView from './views/GetStartedView.vue'
import CreateAccountView from './views/CreateAccountView.vue'
import LogInView from './views/LogInView.vue'
import DashboardView from './views/DashboardView.vue'
import ProfileView from './views/ProfileView.vue'
import CreateProductBacklogView from './views/CreateProductBacklogView.vue'
import CreateSprintView from './views/CreateSprintView.vue'
import SprintOverviewView from './views/SprintOverviewView.vue'
import SprintTestTestTestView from './views/SprintTestTestTestView.vue'
import SortComponent from './components/SortComponent.vue'
import ChartComponent from './components/ChartComponent.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: AboutView,
      path: '/about'
    },
    {
      component: ContactView,
      path: '/contact/'
    },

    {
      component: GetStartedView,
      path: '/'
    },
    {
      component: CreateAccountView,
      path: '/createaccount'
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
    },

    {
      component: SprintTestTestTestView,
      path: '/john'
    },
    {
      component: SortComponent,
      path: '/sorted'
    },
    {
      component: ChartComponent,
      path: '/chart'
    }
  ]
})
