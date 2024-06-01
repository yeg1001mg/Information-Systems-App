import { all, call, put, StrictEffect, takeLeading } from 'redux-saga/effects'
import { GetCurrentUserPayload, UserData } from '../../reducers/auth/types'
import { AuthActions } from '../../reducers/auth'
import { SagaGenerator } from '../../../@types/common'
import { PayloadAction } from '@reduxjs/toolkit';
import { signInUser } from '../../../utils/api/firebaseAPI';

export function* getCurrentUser(action: PayloadAction<GetCurrentUserPayload>) {
    const { email, password } = action.payload;
    const { data, status } = yield call(signInUser, email, password)
    console.log(data, status)
    if (status === 200) {
        console.log(data)
        yield put(AuthActions.setCurrentUser(data))
    }
}

export default function* groupsSagas(): SagaGenerator<StrictEffect> {
    yield all([
        yield takeLeading(AuthActions.getCurrentUser, getCurrentUser)
    ])
}
