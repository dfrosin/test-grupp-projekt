import { ref, onUnmounted } from 'vue'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: 'AIzaSyAl-uNmSQir4hQ2MCQ7fTzQW9TmNFtnJ4g',
  authDomain: 'crumble-9325b.firebaseapp.com',
  databaseURL:
    'https://crumble-9325b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'crumble-9325b',
  storageBucket: 'crumble-9325b.appspot.com',
  messagingSenderId: '376800601571',
  appId: '1:376800601571:web:5f00344766414444f6acd6'
}

const firebaseApp = firebase.initializeApp(config)
console.log(firebaseApp)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = (user) => {
  return usersCollection.add(user)
}

export const getUser = async (id) => {
  const user = await usersCollection.doc(id).get()
  return user.exist && user.data()
  // Bytte från ? : ternary condition till &&
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = (id) => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
