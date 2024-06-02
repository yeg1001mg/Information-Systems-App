import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
    AuthState,
    AuthCurrentUserPayload,
    UpdateUserProfilePayload,
    UserData,
    GetUserProfileDataPayload, AdditionalUserData, UpdatePasswordPayload
} from './types'
import { endSession } from '../../../utils/api/session';

export const initialState: AuthState = {
    user: undefined,
    additionalData: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInRequest: (state, action: PayloadAction<AuthCurrentUserPayload>) => {
        },
        signUpRequest: (state, action: PayloadAction<AuthCurrentUserPayload>) => {
        },
        setCurrentUser: (state, action: PayloadAction<UserData>) => {
            state.user = action.payload
        },
        updateUserProfile: (state, action: PayloadAction<UpdateUserProfilePayload>) => {
        },
        updatePassword: (state, action: PayloadAction<UpdatePasswordPayload>) => {
        },
        getCurrentUserProfileData: (state, action: PayloadAction<GetUserProfileDataPayload>) => {
        },
        setCurrentUserAdditionalData: (state, action: PayloadAction<AdditionalUserData>) => {
            state.additionalData = action.payload
        },
        logout: (state, action: PayloadAction) => {
            state.user = undefined
            state.additionalData = undefined
            endSession();
        },
    },
})

export const AuthActions = authSlice.actions

export const AuthSelectors = {
    getCurrentUser: (state: any): UserData | undefined =>
        state.authReducer.user,
    getCurrentUserAdditionalData: (state: any): AdditionalUserData | undefined =>
        state.authReducer.additionalData,
}

export default authSlice.reducer
