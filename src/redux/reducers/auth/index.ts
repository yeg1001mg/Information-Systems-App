import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState, GetCurrentUserPayload, UserData } from './types'

export const initialState: AuthState = {
    user: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInRequest: (state, action: PayloadAction<GetCurrentUserPayload>) => {
        },
        signUpRequest: (state, action: PayloadAction<GetCurrentUserPayload>) => {
        },
        setCurrentUser: (state, action: PayloadAction<UserData>) => {
            state.user = action.payload
        },
        logout: (state, action: PayloadAction) => {
            state.user = undefined
        },
    },
})

export const AuthActions = authSlice.actions

export const AuthSelectors = {
    getCurrentUser: (state: any): UserData | undefined =>
        state.authReducer.user,
}

export default authSlice.reducer
