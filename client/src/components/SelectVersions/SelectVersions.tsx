import { MultiSelect, MultiSelectProps } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { api } from "api";
import { useEffect, useState } from "react";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export const SelectVersions = ({
  ...props
}: Optional<MultiSelectProps, "data">) => {
  const [versions, setVersions] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    api
      .getVersions()
      .then((result) => setVersions(result))
      .catch((err: Error) => {
        showNotification({
          message: `"${err.message}".\nEither the server is down or your network is down.\nPlease try again later"`,
          color: "red",
        });
        setDisabled(true);
      });
  }, []);

  return (
    <MultiSelect
      data={versions}
      label={"Pick Python version(s)"}
      placeholder="Python version(s)"
      clearable
      clearButtonLabel="Clear selection"
      {...props}
      disabled={disabled}
    />
  );
};
