import * as Actions from "./actions";

let initialState = {
    loginDataRequested: false,
    isLogin: false,
    data: null
};
export default (state = initialState, {type, payload = null}) => {
    switch (type) {
        case Actions.REQUEST_USER_DATA:
            state = {
                ...state,
                loginDataRequested: false
            };
            break;
        case Actions.IS_USER_LOGIN:
            state = {
                ...state,
                loginDataRequested:true,
                isLogin: payload
            };
            break;
        case Actions.RECEIVE_USER_DATA:
            console.log('ddddddddddddd',payload)
            state = {
                ...state,
                loginDataRequested:true,
                data: payload
            };
            break;
        case Actions.DO_LOGOUT_USER:
            state = {
                ...state,
                loginDataRequested: false,
                isLogin: false,
                data: null
            };
            break;
        default:
    }
    return state;
};
