import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { doc, collection, setDoc, getDoc, getDocs } from 'firebase/firestore'

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    updatePassword,
} from 'firebase/auth'
import { env } from '../../env';

const firebaseConfig = {
    apiKey: env.REACT_APP_API_KEY,
    authDomain: env.REACT_APP_AUTH_DOMAIN,
    projectId: env.REACT_APP_PROJECT_ID,
    storageBucket: env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
    appId: env.REACT_APP_APP_ID,
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
