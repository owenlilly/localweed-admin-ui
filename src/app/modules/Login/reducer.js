import * as Actions from "./actions";

let initialState = {
    loginDataRequested: false,
    loginData: null,
    loginDataError: false,
};
export default (state = initialState, { type, payload = null }) => {
    switch (type) {
        case Actions.Request_Authenticate_LOGIN_DATA:
            state = {
                loginDataRequested: true
            };
            break;
        case Actions.Receive_Authenticate_LOGIN_DATA:
            state = {
                loginDataRequested: false,
                loginData: payload,
                loginDataError: payload ? false : true
            };
            break;
        default:
    }
    return state
}