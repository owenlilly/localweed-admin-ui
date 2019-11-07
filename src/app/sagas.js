import { all, fork } from "redux-saga/effects";
// import Actions from './actions'
// import modulesSagas from "./modules/sagas";
import * as userSaga from "./AuthUser/saga"
import * as authLoginSaga from  "./modules/Login/saga"
import * as pagesSaga from  "./modules/Pages/saga"
import * as storesSaga from  "./modules/Stores/saga"

export default function* rootSaga() {
    yield all(
        [
            // ...modulesSagas,
            ...Object.values(userSaga),
            ...Object.values(authLoginSaga),
            ...Object.values(pagesSaga),
            ...Object.values(storesSaga),
            // ...Object.values(tabs),
        ].map(fork)
    );
}

// export const makeRequest = (dd) => {
//     return function* (action) {
//         yield put(Actions.loader.showLoader());
//         yield* dd(action);
//         yield put(Actions.loader.hideLoader());
//     }
// }
