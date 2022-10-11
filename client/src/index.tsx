import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "components/App";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Provider } from "react-redux";
import { store } from "store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
