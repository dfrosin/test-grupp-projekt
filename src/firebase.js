import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import 'firebase/storage'

export const config = {
  apiKey: 'AIzaSyAl-uNmSQir4hQ2MCQ7fTzQW9TmNFtnJ4g',
  authDomain: 'crumble-9325b.firebaseapp.com',
  databaseURL:
    'https://crumble-9325b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'crumble-9325b',
  storageBucket: 'crumble-9325b.appspot.com',
  messagingSenderId: '376800601571',
  appId: '1:376800601571:web:5f00344766414444f6acd6'
}

export const firebaseApp = firebase.initializeApp(config)

export const firestore = getFirestore()

export const db = firebaseApp.firestore()

export const storage = getStorage(firebaseApp)
