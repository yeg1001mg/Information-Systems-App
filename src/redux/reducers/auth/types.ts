export type AuthState = {
    user?: UserData
    userPhoto?: string
}

export interface GetCurrentUserPayload {
    email: string
    password: string
}

export interface UserData {
    email: string
    name: string
    avatar?: string
}
