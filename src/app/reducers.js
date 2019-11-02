import authUser from "./AuthUser/reducer"
import authLogin from "./modules/Login/reducer"
import pages from "./modules/Pages/reducer"
import {reducer as toastrReducer} from 'react-redux-toastr';

export default {
    authUser,
    authLogin,
    pages,
    toastr: toastrReducer

}