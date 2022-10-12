import { configureStore } from "@reduxjs/toolkit";
import { instructionsReducer } from "./slices/instructions";
import { versionsReducer } from "./slices/versions";

export const store = configureStore({
  reducer: {
    versions: versionsReducer,
    instructions: instructionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
