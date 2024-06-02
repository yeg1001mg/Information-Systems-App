export type AuthState = {
    user?: UserData
    additionalData?: AdditionalUserData
}

export interface AuthCurrentUserPayload {
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

export interface AdditionalUserData {
    firstName?: string
    secondName?: string
    lastName?: string
    identificationNumber?: string
    phoneNumber?: string
    email?: string
}

export interface UpdateUserProfilePayload {
    uid: string,
    additionalData: AdditionalUserData
}

export interface UpdatePasswordPayload {
    newPassword: string
}

export interface GetUserProfileDataPayload {
    uid: string,
}