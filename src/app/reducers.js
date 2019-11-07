import authUser from "./AuthUser/reducer"
import authLogin from "./modules/Login/reducer"
import pages from "./modules/Pages/reducer"
import stores from "./modules/Stores/reducer"
import {reducer as toastrReducer} from 'react-redux-toastr';

export default {
    authUser,
    authLogin,
    pages,
    stores,
    toastr: toastrReducer

}