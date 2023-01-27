import { combineReducers,configureStore } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import counterSlice from "./slices/counterSlice";
import storage from "redux-persist/lib/storage";
import todoSlice from "./slices/todoSlice";

const reducers = combineReducers({
  counter: counterSlice.reducer,
  todo: todoSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;