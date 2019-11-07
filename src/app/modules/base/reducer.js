export default (handlerName, extraState = {}, stateHandler = (state, { type, payload = null }) => state) => {

    let initialState = {
        requestList: false,
        list: null,
        requestEdit: false,
        edit: null,
        saveInProgress: false,
        saveSuccess: false,
        previewContent: null,
        ...extraState,
    };
    return (state = initialState, { type, payload = null }) => {
        switch (type) {

            case `PREVIEW_${handlerName}_CONTENT`:
                state = {
                    ...state,
                    previewContent: payload
                };
                break;
            case `REQUEST_${handlerName}_LIST`:
                state = {
                    ...state,
                    saveSuccess:false,// I am now in list so make sure that form status return
                    requestList: true
                };
                break;
            case `RECEIVE_${handlerName}_LIST`:
                state = {
                    ...state,
                    requestList: false,
                    list: payload,
                    edit:null
                };
                break;
            case `REQUEST_${handlerName}_DATA`:
                state = {
                    ...state,
                    requestEdit: true,
                };
                break;
            case `RECEIVE_${handlerName}_DATA`:
                state = {
                    ...state,
                    requestEdit: false,
                    edit: payload
                };
                break;
            case `REQUEST_${handlerName}_SAVE`:
                state = {
                    ...state,
                    saveSuccess: false,
                    saveInProgress: true,
                };
                break;
            case `RECEIVE_${handlerName}_SAVE`:
                state = {
                    ...state,
                    saveInProgress: false,
                    saveSuccess: payload,
                };
                break;
            default:
        }
        if (stateHandler) {
            return stateHandler(state, { type, payload })
        }
        return state
    }

}
