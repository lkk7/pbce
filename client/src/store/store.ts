import { configureStore } from "@reduxjs/toolkit";
import { versionsReducer } from "./slices/selectedVersions";

export const store = configureStore({
  reducer: {
    versions: versionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
