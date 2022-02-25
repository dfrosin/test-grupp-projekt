import { createRouter, createWebHashHistory } from 'vue-router'

import AboutView from './views/firebaseView.vue'
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
import FirebaseButtons from './views/FirebaseButtons.vue'
import SprintOverviewTwoView from './views/SprintOverviewTwoView.vue'
import SprintTestView from './views/SprintTestVue.vue'
import SprintTestTestTestView from './views/SprintTestTestTestView.vue'
import SortComponent from './components/SortComponent.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: HomeView,
      path: '/home'
    },
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
      component: FirebaseButtons,
      path: '/firebase'
    },
    {
      component: SprintOverviewTwoView,
      path: '/catsanddogs'
    },
    {
      component: SprintTestView,
      path: '/sprinttest'
    },
    {
      component: SprintTestTestTestView,
      path: '/sprinttesttesttest'
    },
    {
      component: SortComponent,
      path: '/sorted'
    }
  ]
})
