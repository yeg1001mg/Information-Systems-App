import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { doc, collection, setDoc, getDoc, getDocs } from 'firebase/firestore'

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    updatePassword,
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
const db = getFirestore(app)

const usersCollectionName = 'users'
const tableCollectionName = 'systems_table'

export const createUser = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(getAuth(app), email, password)
}

export const signInUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(getAuth(app), email, password)
}

export const addUserData = async (uid: string, additionalData: any) => {
    return setDoc(doc(db, usersCollectionName, uid), additionalData)
}

export const getUserProfile = async (uid: string) => {
    return getDoc(doc(db, usersCollectionName, uid))
}

export const updateUserPassword = async (newPassword: string) => {
    const auth = getAuth()

    if (auth.currentUser) {
        return updatePassword(auth.currentUser, newPassword)
    }
}

export const getAllDocumentsFromTableCollection = async () => {
    return await getDocs(collection(db, tableCollectionName))
}
