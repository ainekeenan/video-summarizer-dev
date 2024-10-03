import { combineReducers, configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const chatPersistConfig = {
  key: "chat",
  storage: storage,
  whitelist: ["ChatState"],
};

const rootReducer = combineReducers({
  chat: persistReducer(chatPersistConfig, chatReducer),
});

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
