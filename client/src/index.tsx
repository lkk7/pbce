import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Provider } from "react-redux";
import { store } from "store/store";
import { MainPanel } from "components/MainPanel";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        breakpoints: {
          xs: 500,
          sm: 800,
          md: 1000,
          lg: 1200,
          xl: 1400,
        },
      }}
    >
      <NotificationsProvider>
        <Provider store={store}>
          <MainPanel />
        </Provider>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
