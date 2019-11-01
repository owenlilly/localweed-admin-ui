import dataReducer from "./reducer"
import appReducers from "./app/reducers";

export default {
    ...appReducers,
    basic: dataReducer

}