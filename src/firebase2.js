import { initializeApp } from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAl-uNmSQir4hQ2MCQ7fTzQW9TmNFtnJ4g',
  authDomain: 'crumble-9325b.firebaseapp.com',
  databaseURL:
    'https://crumble-9325b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'crumble-9325b',
  storageBucket: 'crumble-9325b.appspot.com',
  messagingSenderId: '376800601571',
  appId: '1:376800601571:web:5f00344766414444f6acd6'
}

//init firebase app
const firebaseApp = initializeApp(firebaseConfig)

//init services
const db = getFirestore(firebaseApp)

// collection ref
const colRef = collection(db, 'projectBacklog')

getDocs(colRef).then((snapshot) => {
  console.log(snapshot.docs)
})

//
