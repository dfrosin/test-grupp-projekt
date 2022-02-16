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
    },
    setArrayOfObjects(state, array) {
      state.arrayOfItems.push({ array })
    }
  },
  state = {
    loggedInUser: null,
    projectName: null,
    sprintGoal: null,
    arrayOfItems: []
  }

export default createStore({ mutations, state, strict: true })
