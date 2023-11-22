interface IApiResult {
    status: boolean,
    data?: any,
    error?: {
        title: string,
        message: string
    }
}

export default IApiResult;