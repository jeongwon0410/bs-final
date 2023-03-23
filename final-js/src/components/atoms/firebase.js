// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBHgjx6n0O6Udz38Qk6huOYJbbYzED7Xh0',
  authDomain: 'project-f4485.firebaseapp.com',
  projectId: 'project-f4485',
  storageBucket: 'project-f4485.appspot.com',
  messagingSenderId: '140732154291',
  appId: '1:140732154291:web:b330ea83c6faf19aa80bc6',
  measurementId: 'G-VN5CTT8926',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
