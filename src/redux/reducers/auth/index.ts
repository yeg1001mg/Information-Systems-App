import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState, GetCurrentUserPayload, UserData } from './types'

export const initialState: AuthState = {
    user: undefined,
    userPhoto: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getCurrentUser: (state, action: PayloadAction<GetCurrentUserPayload>) => {
        },
        setCurrentUser: (state, action: PayloadAction<UserData>) => {
            state.user = action.payload
        },
        logout: (state, action: PayloadAction) => {
            state.user = undefined
            state.userPhoto = undefined
        },
    },
})

export const AuthActions = authSlice.actions

export const AuthSelectors = {
    getCurrentUserPhoto: (state: any): string | undefined =>
        state.authReducer.userPhoto,
    getCurrentUser: (state: any): UserData | undefined =>
        state.authReducer.user,
}

export default authSlice.reducer
