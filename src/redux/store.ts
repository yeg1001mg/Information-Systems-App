import { combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import rootSaga from './sagas'

import authReducer from './reducers/auth'
import systemsTableReducer from './reducers/systemsTable'

const reducers = combineReducers({
    authReducer,
    systemsTableReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store
