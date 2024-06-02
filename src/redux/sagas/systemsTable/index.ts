import { all, call, put, StrictEffect, takeLatest } from 'redux-saga/effects'
import { SagaGenerator } from '../../../@types/common'
import { PayloadAction } from '@reduxjs/toolkit'
import { notification } from 'antd'
import { SystemsTableActions } from '../../reducers/systemsTable'
import { getAllDocumentsFromTableCollection } from '../../../utils/api/firebaseAPI'
import { TableData } from '../../reducers/systemsTable/types'

export function* getTableData(action: PayloadAction) {
    try {
        // @ts-ignore
        const querySnapshot: any = yield call(
            getAllDocumentsFromTableCollection
        )
        const documents: TableData = []
        querySnapshot.forEach((doc: any) => {
            documents.push({ id: doc.id, ...doc.data() })
        })
        yield put(SystemsTableActions.setTableData(<TableData>documents))
    } catch (error: any) {
        yield call(notification.error, {
            message: 'Error',
            description: error.message,
        })
    }
}

export default function* groupsSagas(): SagaGenerator<StrictEffect> {
    yield all([
        yield takeLatest(SystemsTableActions.getTableData, getTableData),
    ])
}
