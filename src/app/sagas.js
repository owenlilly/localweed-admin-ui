import { all, fork } from "redux-saga/effects";
// import Actions from './actions'
// import modulesSagas from "./modules/sagas";
import * as userSaga from "./AuthUser/saga"
import * as authLoginSaga from  "../views/Pages/Login/saga"

export default function* rootSaga() {
    yield all(
        [
            // ...modulesSagas,
            ...Object.values(userSaga),
            ...Object.values(authLoginSaga),
            // ...Object.values(table),
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
