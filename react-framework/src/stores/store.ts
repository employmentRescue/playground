import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import matchSlice from "./match/match"
import liveSlice from "./live/live"
import registerTabSlice from "./register/registerTab";
import userSlice from "./register/user";

const reducers = combineReducers({
    match: matchSlice,
    live: liveSlice,
    registerTab: registerTabSlice,
    user: userSlice,
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

export type RootState = ReturnType<typeof store.getState>;
export default store;
