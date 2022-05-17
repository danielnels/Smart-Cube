
import modalReducer from "./modal";
import userReducer from "./user";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    loggedInUser: userReducer,
     modalSettings: modalReducer,
    
});

export default allReducers;
