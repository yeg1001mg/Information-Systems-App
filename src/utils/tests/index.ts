export interface MockedApiResponse<T> {
    status: number
    data?: T
}

export const responseWrapper = <T>(status: number, data?: T) => {
    return new Promise<MockedApiResponse<T>>((resolve) => {
        resolve({
            status,
            data,
        })
    })
}
