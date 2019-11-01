export const REQUEST_USER_DATA = 'REQUEST_LOGIN_USER_DATA';
export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA';
export const IS_USER_LOGIN = 'IS_USER_LOGIN';
export const DO_LOGOUT_USER = 'DO_LOGOUT_USER';

export const setUserLoginStatus = (isLogin) => ({type: IS_USER_LOGIN, payload: isLogin})

export const requestLoginUserData = () => ({type: REQUEST_USER_DATA})

export const receiveLoginUserData = (data) => ({type: RECEIVE_USER_DATA, payload: data})

export const logoutUser = () => ({type: DO_LOGOUT_USER})


