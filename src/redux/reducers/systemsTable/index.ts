import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SystemsTableState, TableData } from './types';

export const initialState: SystemsTableState = {
    tableData: undefined
}

export const systemsTableSlice = createSlice({
    name: 'systemsTable',
    initialState,
    reducers: {
        getTableData: (state, action: PayloadAction) => {
        },
        setTableData: (state, action: PayloadAction<TableData>) => {
            state.tableData = action.payload;
        },
    },
})

export const SystemsTableActions = systemsTableSlice.actions

export const SystemsTableSelectors = {
    getTableData: (state: any): TableData | undefined =>
        state.systemsTableReducer.tableData,
}

export default systemsTableSlice.reducer
