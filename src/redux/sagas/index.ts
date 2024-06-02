import { all, AllEffect } from 'redux-saga/effects'
import { SagaGenerator } from '../../@types/common'
import authSaga from './auth'
import systemsTableSaga from './systemsTable'

export default function* root(): Generator<AllEffect<SagaGenerator<unknown>>,
    void,
    unknown> {
    yield all([
        authSaga(),
        systemsTableSaga(),
    ])
}
