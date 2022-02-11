import { createStore } from 'vuex'

const mutations = {
    setLoggedInUser(state, user) {
      state.loggedInUser = user
    }
  },
  state = {
    loggedInUser: null
  }

export default createStore({ mutations, state, strict: true })
