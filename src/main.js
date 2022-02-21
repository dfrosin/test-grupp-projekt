import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/store'
import { auth } from './firebase'

let app
//initialize firebase before the app. After receiving a response firebase will fire an event we can listening to.It will tell us if the user is logged in.
auth.onAuthStateChanged(() => {
  if (!app) {
    // The callback can be called multiple times, but we only want to initilize the app once.
    app = createApp(App)
    app.use(router)
    app.use(store)
    app.mount('#app')
  }
})
