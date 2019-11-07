import Actions from "./actions"
import ReducerHandler from "app/modules/base/reducer"
export default ReducerHandler('PAGES', { previewContent: null },
    (state, { type, payload = null }) => {
        switch (type) {
            case Actions.PREVIEW_PAGE_CONTENT:
                state = {
                    ...state,
                    previewContent: payload
                };
                break;
            default:
        }
        return state
    }
)