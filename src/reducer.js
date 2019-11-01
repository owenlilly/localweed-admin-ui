import * as Actions from "./actions";

let initialState = {

    data: "YES ",
};


export default (state = initialState, { type, payload = null }) => {
    switch (type) {
        case Actions.ADD_DATA:
            state = {
                ...state,
                data: state.data
            }
            break;
        default:
    }
    return state;
};
