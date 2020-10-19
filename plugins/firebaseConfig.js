import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import'firebase/auth'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyAtyA2fBtI-sB4GG7Qa7Mo65R1f_ysrxl4',
    authDomain: 'phoneshopproject.firebaseapp.com',
    databaseURL: 'https://phoneshopproject.firebaseio.com',
    projectId: 'phoneshopproject',
    storageBucket: 'phoneshopproject.appspot.com',
    messagingSenderId: '959180464618',
    appId: '1:959180464618:web:09336c931550c667995293',
    measurementId: 'G-YMW8PYT3CR'
  }
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export const st = firebase.storage()


  
