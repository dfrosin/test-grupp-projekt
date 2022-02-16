import { createStore } from 'vuex'

const mutations = {
    setLoggedInUser(state, user) {
      state.loggedInUser = user
    },
    setProjectName(state, name) {
      state.projectName = name
    },
    setSprintGoal(state, goal) {
      state.sprintGoal = goal
    }
  },
  state = {
    loggedInUser: null,
    projectName: null,
    sprintGoal: null
  }

export default createStore({ mutations, state, strict: true })
