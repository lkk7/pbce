import { showNotification } from "@mantine/notifications";
import axios, { AxiosError } from "axios";
import { strings } from "strings";

export const errorTostring = (err: AxiosError | Error) => {
  if (axios.isAxiosError(err)) {
    switch (err.code) {
      case "ERR_NETWORK":
        return strings.networkErrTryAgain;
      default:
        return `Error: "${err.message}"`;
    }
  } else {
    return `Error: "${err.message}"`;
  }
};

export const requestErrorHandler = (err: Error | AxiosError) => {
  showNotification({
    message: errorTostring(err),
    color: "red",
  });
};
