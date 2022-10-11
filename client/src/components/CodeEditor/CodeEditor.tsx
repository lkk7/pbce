import Editor, { EditorProps, OnChange } from "@monaco-editor/react";
import { getDisassembled } from "api/endpoints";
import { useCallback } from "react";
import { typedUseSelector } from "store/hooks";
import { selectedVersionsSelector } from "store/slices/selectedVersions";

const editorProps: EditorProps = {
  width: "100%",
  height: "50vh",
  language: "python",
  theme: "vs-dark",
};

export const CodeEditor = () => {
  const selectedVersions = typedUseSelector(selectedVersionsSelector);

  const onChange: OnChange = useCallback(
    (code, _) => {
      if (!code) return;
      // TODO: debounce & handle
      getDisassembled(code, selectedVersions).then((res) => console.log(res));
    },
    [selectedVersions]
  );

  return <Editor {...editorProps} onChange={onChange} />;
};
