import {call, put, takeLatest} from "redux-saga/effects";
import Api from "app/api";
import {receiveLoginUserData, setUserLoginStatus, REQUEST_USER_DATA,DO_LOGOUT_USER} from "./actions"
import {removeLoginToken} from "../token";


function* getLoginUserData() {
    try {
        // check token is valid
        const res = yield call(Api.getUserData);
        yield put(receiveLoginUserData(res.data))

    } catch (e) {
        yield put(setUserLoginStatus(false))
        console.log(e);
    }
}
function* logoutUser() {
    yield call(removeLoginToken);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export function* mySaga() {
    yield takeLatest(REQUEST_USER_DATA, (getLoginUserData));
    yield takeLatest(DO_LOGOUT_USER, (logoutUser));
}
