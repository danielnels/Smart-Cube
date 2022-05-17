import * as actions from "../actionTypes";

function modalReducer(state = {}, action) {
    switch (action.type) {
        case actions.UPDATE_AND_SHOW_MODAL:
            return action.payload;
        case actions.HIDE_MODAL:
            return { show: false };
        default:
            //always return state at the end so the whole app doesn't break if there is an issue
            return state;
    }
}

export default modalReducer;
