import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createdInvoiceSlice from "./slices/createdInvoiceSlice.js";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storedInvoiceSlice from "./slices/storedInvoiceSlice.js";

const persistConfig = {
  key: "root",
  storage,
};

const roorReducer = combineReducers({
  createdInvoice: createdInvoiceSlice.reducer,
  storedInvoice: storedInvoiceSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, roorReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
