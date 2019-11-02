import { call, put, takeLatest } from "redux-saga/effects";
import Api from "app/api";
import {
    REQUEST_PAGE_LIST,
    REQUEST_PAGE_SAVE,
    REQUEST_PAGE_DATA,
    REQUEST_PAGE_DELETE,
    receivePageSave,
    receivePageList,
    receivePageData,
    requestPageList
} from "./actions"
import notifications from "app/notification";

function* requestList(action) {
    try {
        const res = yield call(Api.get, 'pages', action.payload);
        yield put(receivePageList(res.data))
    } catch (e) {
        console.log(e);
    }
}

function* saveNew(action) {
    try {
        if (action.payload.id) {
            // update
             yield call(Api.put, 'admin/pages/' + action.payload.id, action.payload.data);
            (notifications.notifySuccess('Success', 'Data Saved'));

        } else {
            //create new
             yield call(Api.post, 'admin/pages', action.payload.data);
            (notifications.notifySuccess('Success', 'Page Added'));
        }
        yield put(receivePageSave()) // to confirm update done
    } catch (e) {
        console.log(e);
    }
}


function* getData(action) {
    try {
        const res = yield call(Api.get, 'admin/pages/' + action.payload);
        yield put(receivePageData(res.data))
    } catch (e) {
        console.log(e);
    }
}

function* deletePage(action) {
    try {
         yield call(Api.delete, 'admin/pages/' + action.payload);
        (notifications.notifySuccess('Success', 'Page Deleted'));
        yield put(requestPageList())

    } catch (e) {
        console.log(e);
    }
}

export function* mySaga() {
    yield takeLatest(REQUEST_PAGE_LIST, requestList);
    yield takeLatest(REQUEST_PAGE_SAVE, saveNew);
    yield takeLatest(REQUEST_PAGE_DATA, getData);
    yield takeLatest(REQUEST_PAGE_DELETE, deletePage);
}
