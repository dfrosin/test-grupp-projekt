import { createStore } from 'vuex'

const mutations = {
    setLoggedInUser(state, user) {
      state.loggedInUser = user
    },
    setProjectName(state, name) {
      state.projectName = name
    }
  },
  state = {
    loggedInUser: null,
    projectName: null
  }

export default createStore({ mutations, state, strict: true })
