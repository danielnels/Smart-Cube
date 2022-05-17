import { createStore } from "redux";
import allReducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//settings for persistent store (default being used is local storage)
const persistConfig = {
    key: "root",
    storage,
    blacklist: ["modalSettings"],
};
//create a persisted reducer using standard reducer
const persistedReducer = persistReducer(persistConfig, allReducers);

//create store and allow dev tools to work
let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
//create a persister
let persistor = persistStore(store);

//export the store and persister
export { store, persistor };
