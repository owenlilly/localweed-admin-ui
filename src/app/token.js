export const localApiUrl = '/api'

const cookieTokenName = 'app_token';
export const setLoginToken = (token) => {
    localStorage.setItem(cookieTokenName, token);
}
export const getLoginToken = () => {
    return localStorage.getItem(cookieTokenName);
}

export const removeLoginToken = () => {
    localStorage.removeItem(cookieTokenName);
}