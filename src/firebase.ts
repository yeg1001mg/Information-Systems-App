import { initializeApp } from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyArR5Udbm8B9YAihlhnpGZ2FemvjyiBHUg',
    authDomain: 'information-systems-app-424716.firebaseapp.com',
    projectId: 'information-systems-app-424716',
    storageBucket: 'information-systems-app-424716.appspot.com',
    messagingSenderId: '885080998773',
    appId: '1:885080998773:web:1898ce6f75734e2587c93c',
}

const app = initializeApp(firebaseConfig)

export const createUser = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(getAuth(app), email, password)
}

export const signInUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(getAuth(app), email, password)
}
