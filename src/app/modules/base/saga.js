import { call, put, takeLatest } from "redux-saga/effects";
import Api from "app/api";
import Actions from "./actions"
import notifications from "app/notification";
export default (hamdlerName,baseUrl) => {



    const {
        REQUEST_LIST,
        REQUEST_SAVE,
        REQUEST_DATA,
        REQUEST_DELETE,
        receiveSave,
        receiveList,
        receiveData,
        requestList
    } = Actions(hamdlerName)

    function* requestListData(action) {
        try {
            const res = yield call(Api.get, baseUrl, action.payload);
            yield put(receiveList(res.data))
        } catch (e) {
            console.log(e);
        }
    }

    function* saveNew(action) {
        try {
            if (action.payload.id) {
                // update
                 yield call(Api.put, baseUrl+'/' + action.payload.id, action.payload.data);
                (notifications.notifySuccess('Success', 'Record Updated'));

            } else {
                //create new
                 yield call(Api.post, baseUrl, action.payload.data);
                (notifications.notifySuccess('Success', 'Record Added'));
            }
            yield put(receiveSave(true)) // to confirm update done
        } catch (e) {
            // console.log(Object.keys(e),e.response.data)
            (notifications.notifyError('Error', e.response.data.message));
            yield put(receiveSave(false)) // to confirm update done
        }
    }


    function* getData(action) {
        try {
            const res = yield call(Api.get, baseUrl+'/' + action.payload);
            yield put(receiveData(res.data))
        } catch (e) {
            console.log(e);
        }
    }

    function* deletePage(action) {
        try {
            yield call(Api.delete, baseUrl+'/' + action.payload.id);
            (notifications.notifySuccess('Success', 'Record Deleted'));
            yield put(requestList(action.payload.qs))

        } catch (e) {
            console.log(e);
        }
    }

    return function* mySaga() {
        yield takeLatest(REQUEST_LIST, requestListData);
        yield takeLatest(REQUEST_SAVE, saveNew);
        yield takeLatest(REQUEST_DATA, getData);
        yield takeLatest(REQUEST_DELETE, deletePage);
    }
}
