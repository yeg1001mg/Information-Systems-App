import { expectSaga } from 'redux-saga-test-plan'
import { call } from 'redux-saga/effects'
import { responseWrapper } from '../../../../utils/tests'
import {
    AuthActions,
    initialState,
    default as reducer,
} from '../../../reducers/auth'
import { AuthState } from '../../../reducers/auth/types'
import { signInUser } from '../../../../utils/api/firebaseAPI';
import { signInRequest } from '../../auth';


describe('Tests for Auth Saga', () => {
    describe('getCurrentUser function', () => {
        const responseData: any = {
            name: 'User name',
        }

        it('works properly on api response', () => {
            return expectSaga(signInRequest)
                .withReducer(reducer)
                .hasFinalState<AuthState>({
                    ...initialState,
                    user: responseData,
                })
                .provide([
                    [call(signInUser), responseWrapper(200, responseData)],
                ])
                .call(signInUser)
                .put(AuthActions.setCurrentUser(responseData))
                .run()
        })

        it('works properly on api response error', () => {
            return expectSaga(signInRequest)
                .withReducer(reducer)
                .hasFinalState<AuthState>(initialState)
                .provide([
                    [call(signInUser), responseWrapper(404, responseData)],
                ])
                .call(signInUser)
                .not.put(AuthActions.setCurrentUser(responseData))
                .run()
        })
    })
})
