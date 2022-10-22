import Editor, { EditorProps, OnChange } from "@monaco-editor/react";
import { getDisassembled } from "api/endpoints";
import { useCallback, useMemo } from "react";
import { typedUseDispatch, typedUseSelector } from "store/hooks";
import { setInstructions } from "store/slices/instructions";
import { selectedVersionsSelector } from "store/slices/versions";
import { debounceRequest, unicodeStrToByteStr } from "./utils";

const editorProps: EditorProps = {
  width: "100%",
  height: "50vh",
  language: "python",
  theme: "vs-dark",
};

export const CodeEditor = () => {
  const dispatch = typedUseDispatch();
  const selectedVersions = typedUseSelector(selectedVersionsSelector);
  const onChange: OnChange = useCallback(
    (code) => {
      if (!code || !code.trim()) return;
      getDisassembled(
        // The code payload is base64-encoded because the server API requires it.
        window.btoa(unicodeStrToByteStr(code)),
        selectedVersions
      ).then((res) => {
        dispatch(setInstructions(res));
      });
    },
    [dispatch, selectedVersions]
  );
  const debouncedOnChange = useMemo(
    () => debounceRequest(onChange, 500),
    [onChange]
  );

  return <Editor {...editorProps} onChange={debouncedOnChange} />;
};
