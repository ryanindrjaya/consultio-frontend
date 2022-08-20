import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userReducer from "../features/user/userSlice";
import storage from "./storage";

const persistConfig = {
  key: "root",
  storage,
  middleware: [thunk],
  blacklist: ["error", "success"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store);
