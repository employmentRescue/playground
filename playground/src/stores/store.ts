import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import matchSlice from "./match/match"
import liveSlice from "./live/live"
import registerTabSlice from "./registerTab/registerTab";

const reducers = combineReducers({
    match: matchSlice,
    registerTab: registerTabSlice,
})

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export default store;
