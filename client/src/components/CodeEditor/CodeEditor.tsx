import Editor, { EditorProps, OnChange } from "@monaco-editor/react";
import { getDisassembled } from "api/endpoints";
import { useCallback, useMemo } from "react";
import { typedUseDispatch, typedUseSelector } from "store/hooks";
import { setInstructions } from "store/slices/instructions";
import { selectedVersionsSelector } from "store/slices/versions";

const editorProps: EditorProps = {
  width: "100%",
  height: "50vh",
  language: "python",
  theme: "vs-dark",
};

const debounce = (func: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    const toExecute = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(toExecute, delay);
  };
};

export const CodeEditor = () => {
  const dispatch = typedUseDispatch();
  const selectedVersions = typedUseSelector(selectedVersionsSelector);
  const onChange: OnChange = useCallback(
    (code) => {
      if (!code || !code.trim()) return;
      getDisassembled(code, selectedVersions).then((res) =>
        dispatch(setInstructions(res))
      );
    },
    [dispatch, selectedVersions]
  );
  const debouncedOnChange = useMemo(() => debounce(onChange, 500), [onChange]);

  return <Editor {...editorProps} onChange={debouncedOnChange} />;
};
