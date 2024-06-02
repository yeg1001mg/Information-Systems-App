import { all, call, put, StrictEffect, takeLatest } from 'redux-saga/effects'
import { GetCurrentUserPayload, UserData } from '../../reducers/auth/types'
import { AuthActions } from '../../reducers/auth'
import { SagaGenerator } from '../../../@types/common'
import { PayloadAction } from '@reduxjs/toolkit';
import { createUser, signInUser } from '../../../utils/api/firebaseAPI';
import { UserCredential } from '@firebase/auth';
import { notification } from 'antd';
import { startSession, UserType } from '../../../utils/api/session';

export function* signInRequest(action: PayloadAction<GetCurrentUserPayload>) {
    try {
        const { email, password, callback } = action.payload;
        const loginResponse: UserCredential = yield call(signInUser, email, password)
        yield put(AuthActions.setCurrentUser(<UserData>{
            displayName: loginResponse.user.displayName,
            email: loginResponse.user.email,
            emailVerified: loginResponse.user.emailVerified,
            phoneNumber: loginResponse.user.phoneNumber,
            photoURL: loginResponse.user.photoURL,
            uid: loginResponse.user.uid,
        }))
        yield call(notification.success, {
            message: 'Login Successful',
            description: 'You have successfully logged in.',
        });
        startSession(loginResponse.user as UserType)
        callback && callback()
    } catch (error: any) {
        yield call(notification.error, {
            message: 'Error',
            description: error.message,
        });
    }
}

export function* signUpRequest(action: PayloadAction<GetCurrentUserPayload>) {
    try {
        const { email, password, callback } = action.payload;
        const loginResponse: UserCredential = yield call(createUser, email, password)
        yield put(AuthActions.setCurrentUser(<UserData>{
            displayName: loginResponse.user.displayName,
            email: loginResponse.user.email,
            emailVerified: loginResponse.user.emailVerified,
            phoneNumber: loginResponse.user.phoneNumber,
            photoURL: loginResponse.user.photoURL,
            uid: loginResponse.user.uid,
        }))
        yield call(notification.success, {
            message: 'User Created',
            description: 'You have successfully logged in.',
        });
        startSession(loginResponse.user as UserType)
        callback && callback()
    } catch (error: any) {
        yield call(notification.error, {
            message: 'Error',
            description: error.message,
        });
    }
}

export default function* groupsSagas(): SagaGenerator<StrictEffect> {
    yield all([
        yield takeLatest(AuthActions.signInRequest, signInRequest),
        yield takeLatest(AuthActions.signUpRequest, signUpRequest)
    ])
}
