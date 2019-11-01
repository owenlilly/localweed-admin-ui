export const Request_Authenticate_LOGIN_DATA = "Request_Authenticate_LOGIN_DATA";
export const Receive_Authenticate_LOGIN_DATA = "Receive_Authenticate_LOGIN_DATA";

export const requestAuthenticateLoginData = (data) => ({
    type: Request_Authenticate_LOGIN_DATA,
    payload: data
})


export const receiveAuthenticateLoginData = (data) => ({
    type: Receive_Authenticate_LOGIN_DATA,
    payload: data
})
