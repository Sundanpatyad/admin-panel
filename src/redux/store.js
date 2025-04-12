import { persistReducer, persistStore } from "redux-persist";

import attendanceReducer from "./slices/attendanceSlice";
import candidateSlice from "./slices/candidateSlice";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/empoyeeSlice";
import leaveReducer from "./slices/leaveSlice";
import navReducer from "./slices/navSclice";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  candidate: candidateSlice,
  employees: employeeReducer,
  attendance: attendanceReducer,
  leave: leaveReducer,
  nav: navReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["user.error"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
