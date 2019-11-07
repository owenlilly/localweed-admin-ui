
export default (handlerName) => {

    const RESET_FORM = `RESET_${handlerName}_FORM`
    const REQUEST_LIST = `REQUEST_${handlerName}_LIST`
    const RECEIVE_LIST = `RECEIVE_${handlerName}_LIST`
    const REQUEST_DATA = `REQUEST_${handlerName}_DATA`
    const RECEIVE_DATA = `RECEIVE_${handlerName}_DATA`
    const REQUEST_SAVE = `REQUEST_${handlerName}_SAVE`
    const RECEIVE_SAVE = `RECEIVE_${handlerName}_SAVE`
    const REQUEST_DELETE = `REQUEST_${handlerName}_DELETE`
    const RECEIVE_DELETE = `RECEIVE_${handlerName}_DELETE`

    return {

        RESET_FORM,
        REQUEST_LIST,
        RECEIVE_LIST,
        REQUEST_DATA,
        RECEIVE_DATA,
        REQUEST_SAVE,
        RECEIVE_SAVE,
        REQUEST_DELETE,
        RECEIVE_DELETE,

        resetForm: () => ({
            type: RESET_FORM,
        }),

        requestList: (data) => ({
            type: REQUEST_LIST,
            payload: data
        }),
        receiveList: (data) => ({
            type: RECEIVE_LIST,
            payload: data
        }),
        requestData: (data) => ({
            type: REQUEST_DATA,
            payload: data
        }),
        receiveData: (data) => ({
            type: RECEIVE_DATA,
            payload: data
        }),
        requestSave: (data, id = null) => ({
            type: REQUEST_SAVE,
            payload: { data, id }
        }),
        receiveSave: (success) => ({
            type: RECEIVE_SAVE,
            payload: success
        }),
        requestDelete: (data) => ({
            type: REQUEST_DELETE,
            payload: data
        }),

    }
}