import * as Actions from "./actions";

let initialState = {
    requestList: false,
    list: null,
    requestEdit: false,
    edit: null,
    saveInProgress: false,
    saveSuccess: false,
    previewContent:null,
};
export default (state = initialState, { type, payload = null }) => {
    switch (type) {
        case Actions.RESET_PAGE_FORM:
            state = {
                ...initialState,
            };
            break;
        case Actions.PREVIEW_PAGE_CONTENT:
            state = {
                ...state,
                previewContent:payload
            };
            break;
        case Actions.REQUEST_PAGE_LIST:
            state = {
                ...state,
                requestList: true
            };
            break;
        case Actions.RECEIVE_PAGE_LIST:
            state = {
                ...state,
                requestList: false,
                list: payload
            };
            break;
        case Actions.REQUEST_PAGE_DATA:
            state = {
                ...state,
                requestEdit: true,
            };
            break;
        case Actions.RECEIVE_PAGE_DATA:
            state = {
                ...state,
                requestEdit: false,
                edit: payload
            };
            break;
        case Actions.REQUEST_PAGE_SAVE:
            state = {
                ...state,
                saveSuccess: false,
                saveInProgress: true,
            };
            break;
        case Actions.RECEIVE_PAGE_SAVE:
            state = {
                ...state,
                saveInProgress: false,
                saveSuccess: true,
            };
            break;
        default:
    }
    return state
}