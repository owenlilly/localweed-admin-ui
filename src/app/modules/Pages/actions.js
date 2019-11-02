export const RESET_PAGE_FORM = "RESET_PAGE_FORM";

export const REQUEST_PAGE_LIST = "REQUEST_PAGE_LIST";
export const RECEIVE_PAGE_LIST = "RECEIVE_PAGE_LIST";
export const REQUEST_PAGE_DATA = "REQUEST_PAGE_DATA";
export const RECEIVE_PAGE_DATA = "RECEIVE_PAGE_DATA";
export const REQUEST_PAGE_SAVE = "REQUEST_PAGE_SAVE";
export const RECEIVE_PAGE_SAVE = "RECEIVE_PAGE_SAVE";
export const REQUEST_PAGE_DELETE = "REQUEST_PAGE_DELETE";
export const RECEIVE_PAGE_DELETE = "RECEIVE_PAGE_DELETE";


export const resetPageForm = () => ({
    type: RESET_PAGE_FORM,
});

export const requestPageList = (data) => ({
    type: REQUEST_PAGE_LIST,
    payload: data
});
export const receivePageList = (data) => ({
    type: RECEIVE_PAGE_LIST,
    payload: data
});
export const requestPageData = (data) => ({
    type: REQUEST_PAGE_DATA,
    payload: data
});
export const receivePageData = (data) => ({
    type: RECEIVE_PAGE_DATA,
    payload: data
});
export const requestPageSave = (data,id=null) => ({
    type: REQUEST_PAGE_SAVE,
    payload: {data,id}
});
export const receivePageSave = (data) => ({
    type: RECEIVE_PAGE_SAVE,
    payload: data
});
export const requestPageDelete = (data) => ({
    type: REQUEST_PAGE_DELETE,
    payload: data
});
export const receivePageDelete = (data) => ({
    type: RECEIVE_PAGE_DELETE,
    payload: data
});
