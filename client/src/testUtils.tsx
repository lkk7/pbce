import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { render as originalRender } from "@testing-library/react";
import { instructionsReducer } from "store/slices/instructions";
import { versionsReducer } from "store/slices/versions";
import { Provider } from "react-redux";
import { RootState } from "store/store";

const render = (ui: React.ReactElement, initialState?: RootState) => {
  const store = configureStore({
    reducer: {
      versions: versionsReducer,
      instructions: instructionsReducer,
    },
    preloadedState: initialState,
  });
  const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <Provider store={store}>{children}</Provider>;
  return {
    store: store,
    rendered: originalRender(ui, { wrapper: StoreProvider }),
  };
};

export * from "@testing-library/react";
export { render };
