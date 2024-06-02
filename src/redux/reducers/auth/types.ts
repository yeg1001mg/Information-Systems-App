export type AuthState = {
    user?: UserData
}

export interface GetCurrentUserPayload {
    email: string
    password: string
    callback?: () => void
}

export interface UserData {
    email: string
    displayName: string | null
    password?: string
    emailVerified: boolean
    phoneNumber: string | null
    photoURL: string | null
    uid: string
}
