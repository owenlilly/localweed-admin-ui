import axios from "axios";
import { localApiUrl, getLoginToken } from "./token";

import queryString from 'query-string';


const requestHeaders = () => ({
    responseType: "json",
    headers: {
        Authorization: 'Bearer '+getLoginToken()
    }
});
axios.interceptors.response.use(null, function (error) {
    if (error.status === 401) {
        return null;
    }
    return Promise.reject(error);
});
const get = (url) => axios.get(`${localApiUrl}/${url}`, requestHeaders());
const post = (url, data) => axios.post(`${localApiUrl}/${url}`, data, requestHeaders());
// const put = (url, data) => axios.put(`${localApiUrl}/${url}`, data, requestHeaders());

export default {
    get: (url, query = {}) => {
        return get(`${url}?${queryString.stringify(query)}`)
    },
    post: (url, data, query={}) => {
        return post(`${url}?${queryString.stringify(query)}`, data)
    },
    loginUser: (formValues) => {
        return post(`default/loginReactToken`, formValues);
    },
    getUserData: () => {
        return get(`admin/test`);
    },

};

