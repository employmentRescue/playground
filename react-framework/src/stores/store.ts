import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import matchSlice from "./match/match"
import liveSlice from "./live/live"
import registerTabSlice from "./register/registerTab";
import userInfoSlice from "./register/userInfo";
import userIdSlice from "./user/userId";
import myTeamSlice from "./user/myTeam";
import createTeamSlice from "./user/createTeam";

const reducers = combineReducers({
    match: matchSlice,
    live: liveSlice,
    registerTab: registerTabSlice,
    userInfo: userInfoSlice,
    userId: userIdSlice,
    myTeam: myTeamSlice,
    createTeam: createTeamSlice,
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
