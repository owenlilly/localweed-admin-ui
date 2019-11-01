import {call, put,  takeLatest} from "redux-saga/effects";
import Api from "app/api";
// import notifications from "app/notification";
import {Request_Authenticate_LOGIN_DATA,receiveAuthenticateLoginData} from "./actions"
// import {setUserLoginStatus} from "app/user/actions"
// import {makeRequest} from "app/sagas";
// import {setLoginToken} from "../../../config";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* login(action) {
    try {
        console.log('action.payload',action.payload)

        const res = yield call(Api.post,'admin/login', action.payload);
        console.log(res)
        if (res.data.error) {
            // (notifications.notifyError('Error', 'Error in login data'));
            yield put(receiveAuthenticateLoginData(null))
        } else {
            // (notifications.notifySuccess('', 'Welcome'));
            // setLoginToken(res.data.token);
            yield put(receiveAuthenticateLoginData(res.data))
        }
    } catch (e) {
        yield put(receiveAuthenticateLoginData(null))

        console.log(e);
    }
}
export function* mySaga() {
    yield takeLatest(Request_Authenticate_LOGIN_DATA, (login));
}
