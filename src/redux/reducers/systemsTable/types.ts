export type SystemsTableState = {
    tableData?: TableData
}

export type TableEntity = {
    id: string
    title: string
    metadata?: number
    electronicServices?: number
    directories?: number
}

export type TableData = Array<TableEntity>
