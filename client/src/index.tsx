import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "components/App";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
