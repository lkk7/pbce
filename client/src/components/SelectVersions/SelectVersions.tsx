import { MultiSelect, MultiSelectProps } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { api } from "api";
import { useCallback, useEffect, useState } from "react";
import { typedUseDispatch } from "store/hooks";
import { setSelectedVersions } from "store/slices/selectedVersions";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export const SelectVersions = ({
  ...props
}: Optional<MultiSelectProps, "data">) => {
  const dispatch = typedUseDispatch();
  const [versions, setVersions] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);
  const onSelectChange = useCallback(
    (value: string[]) => dispatch(setSelectedVersions(value)),
    [dispatch]
  );

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
      onChange={onSelectChange}
    />
  );
};
