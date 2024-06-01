import AuthSlice, { initialState, AuthActions, AuthSelectors } from '..'
import store from '../../../store'

describe('Tests for AuthSlice', () => {
    test('initialize slice with initialValue', () => {
        const initSlice = AuthSlice(initialState, { type: 'unknown' })
        expect(initSlice).toBe(initialState)
    })
    test('setCurrentUser', () => {
        const mockUser = {
            email: '',
            avatar: '',
            name: '',
        }
        const afterReducerOperation = AuthSlice(
            initialState,
            AuthActions.setCurrentUser(mockUser)
        )
        expect(afterReducerOperation).toStrictEqual({
            ...initialState,
            user: mockUser,
        })
    })
    test('logout', () => {
        const afterReducerOperation = AuthSlice(
            initialState,
            AuthActions.logout()
        )
        expect(afterReducerOperation).toStrictEqual({
            ...initialState,
            user: undefined,
            userPhoto: undefined,
        })
    })
    test('getCurrentUserPhoto selector', () => {
        expect(AuthSelectors.getCurrentUserPhoto(store.getState())).toBe(
            undefined
        )
    })
    test('getCurrentUser selector', () => {
        expect(AuthSelectors.getCurrentUser(store.getState())).toBe(undefined)
    })
})
