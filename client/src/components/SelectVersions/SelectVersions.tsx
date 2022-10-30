import React, { MutableRefObject } from "react";
import { MultiSelect, MultiSelectProps } from "@mantine/core";
import { api } from "api";
import { requestErrorHandler } from "api/errors";
import { editor } from "monaco-editor";

import { useCallback, useEffect, useState } from "react";
import { typedUseDispatch, typedUseSelector } from "store/hooks";
import {
  selectedVersionsSelector,
  setSelectedVersions,
} from "store/slices/versions";
import { strings } from "strings";
import { getAndHandleDisassembled } from "components/CodeEditor/utils";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export const SelectVersions = React.forwardRef<
  editor.ICodeEditor,
  Optional<MultiSelectProps, "data">
>((props, ref) => {
  const dispatch = typedUseDispatch();
  const [versions, setVersions] = useState<string[]>(["all"]);
  const [disabled, setDisabled] = useState(false);
  const selectedVersions = typedUseSelector(selectedVersionsSelector);

  const onSelectChange = useCallback(
    (value: string[]) => {
      const editorValue = (
        ref as MutableRefObject<editor.ICodeEditor>
      ).current.getValue();
      // "all" can only be selected alone. If we select something else
      // and "all" is already selected (is at first position), we should remove it.
      if (value.length > 1 && value[0] === "all") value = value.slice(1);
      if (value.includes("all")) value = ["all"];
      dispatch(setSelectedVersions(value));
      if (!editorValue || !editorValue.trim()) return;
      getAndHandleDisassembled(editorValue, value, dispatch);
    },
    [dispatch, ref]
  );

  useEffect(() => {
    api
      .getVersions()
      .then((result) => setVersions(["all", ...result]))
      .catch((err: Error) => {
        requestErrorHandler(err);
        setDisabled(true);
      });
  }, []);

  return (
    <MultiSelect
      data={versions}
      value={selectedVersions}
      defaultValue={["all"]}
      label={strings.pickPyVersions}
      placeholder={strings.pickPyVersions}
      clearable
      clearButtonLabel="Clear selection"
      {...props}
      disabled={disabled}
      onChange={onSelectChange}
    />
  );
});
