export const localApiUrl = process.env.REACT_APP_API_URL

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