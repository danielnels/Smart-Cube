import * as actions from "../actionTypes";

export const loginRedux = (
    id,
    username,
    email,
    isVerified,
    
) => {
    return {
        type: actions.LOGIN_REDUX,
        payload: { id, username, email, isVerified, },
    };
};
export const logoutRedux = () => {
    return { type: actions.LOGOUT_REDUX };
};


