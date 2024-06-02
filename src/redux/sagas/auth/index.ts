import { all, call, put, StrictEffect, takeLatest } from 'redux-saga/effects'
import {
    AuthCurrentUserPayload,
    GetUserProfileDataPayload,
    UpdatePasswordPayload,
    UpdateUserProfilePayload,
    UserData,
} from '../../reducers/auth/types'
import { AuthActions } from '../../reducers/auth'
import { SagaGenerator } from '../../../@types/common'
import { PayloadAction } from '@reduxjs/toolkit'
import {
    addUserData,
    createUser,
    getUserProfile,
    signInUser,
    updateUserPassword,
} from '../../../utils/api/firebaseAPI'
import { UserCredential } from '@firebase/auth'
import { notification } from 'antd'
import { startSession, UserType } from '../../../utils/api/session'

export function* signInRequest(action: PayloadAction<AuthCurrentUserPayload>) {
    try {
        const { email, password, callback } = action.payload
        const loginResponse: UserCredential = yield call(
            signInUser,
            email,
            password
        )
        yield put(
            AuthActions.setCurrentUser(<UserData>{
                displayName: loginResponse.user.displayName,
                email: loginResponse.user.email,
                emailVerified: loginResponse.user.emailVerified,
                phoneNumber: loginResponse.user.phoneNumber,
                photoURL: loginResponse.user.photoURL,
                uid: loginResponse.user.uid,
            })
        )
        startSession(loginResponse.user as UserType)
        callback && callback()
    } catch (error: any) {
        yield call(notification.error, {
            message: 'Error',
            description: error.message,
        })
    }
}

export function* signUpRequest(action: PayloadAction<AuthCurrentUserPayload>) {
    try {
        const { email, password, callback } = action.payload
        const loginResponse: UserCredential = yield call(
            createUser,
            email,
            password
        )
        yield put(
            AuthActions.setCurrentUser(<UserData>{
                displayName: loginResponse.user.displayName,
                email: loginResponse.user.email,
                emailVerified: loginResponse.user.emailVerified,
                phoneNumber: loginResponse.user.phoneNumber,
                photoURL: loginResponse.user.photoURL,
                uid: loginResponse.user.uid,
            })
        )
        startSession(loginResponse.user as UserType)
        callback && callback()
    } catch (error: any) {
        yield call(notification.error, {
            message: 'Error',
            description: error.message,
        })
    }
}

export function* updateUserProfile(
    action: PayloadAction<UpdateUserProfilePayload>
) {
    try {
        const { uid, additionalData } = action.payload
        yield call(addUserData, uid, additionalData)
        yield call(notification.success, {
            message: 'Обновление профиля',
            description: 'Ваши изменения сохранены',
        })
    } catch (error: any) {
        yield call(notification.error, {
            message: 'Error',
            description: error.message,
        })
    }
}

export function* getCurrentUserProfileData(
    action: PayloadAction<GetUserProfileDataPayload>
) {
    try {
        const { uid } = action.payload
        //@ts-ignore
        const userProfileData = yield call(getUserProfile, uid)
        if (userProfileData.exists()) {
            yield put(
                AuthActions.setCurrentUserAdditionalData(userProfileData.data())
            )
        } else {
            console.log('No such document!')
            return null
        }
    } catch (error: any) {
        yield call(notification.error, {
            message: 'Error',
            description: error.message,
        })
    }
}

export function* updatePassword(action: PayloadAction<UpdatePasswordPayload>) {
    try {
        const { newPassword } = action.payload
        yield call(updateUserPassword, newPassword)
        yield call(notification.success, {
            message: 'Обновление пароля',
            description: 'Пароль успешно изменён',
        })
    } catch (error: any) {
        yield call(notification.error, {
            message: 'Error',
            description: error.message,
        })
    }
}

export default function* groupsSagas(): SagaGenerator<StrictEffect> {
    yield all([
        yield takeLatest(AuthActions.signInRequest, signInRequest),
        yield takeLatest(AuthActions.signUpRequest, signUpRequest),
        yield takeLatest(AuthActions.updateUserProfile, updateUserProfile),
        yield takeLatest(
            AuthActions.getCurrentUserProfileData,
            getCurrentUserProfileData
        ),
        yield takeLatest(AuthActions.updatePassword, updatePassword),
    ])
}
