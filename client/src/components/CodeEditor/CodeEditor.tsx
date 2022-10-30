import React from "react";
import Editor, { EditorProps, OnChange } from "@monaco-editor/react";
import { useCallback, useMemo } from "react";
import { typedUseDispatch, typedUseSelector } from "store/hooks";
import { selectedVersionsSelector } from "store/slices/versions";
import { debounceRequest, getAndHandleDisassembled } from "./utils";
import { editor } from "monaco-editor";

const editorProps: EditorProps = {
  width: "100%",
  height: "50vh",
  language: "python",
  theme: "vs-dark",
};

export const CodeEditor = React.forwardRef<editor.ICodeEditor>(
  (_, editorRef) => {
    const dispatch = typedUseDispatch();
    const selectedVersions = typedUseSelector(selectedVersionsSelector);
    const onChange: OnChange = useCallback(
      (code) => {
        if (!code || !code.trim()) return;
        getAndHandleDisassembled(code, selectedVersions, dispatch);
      },
      [dispatch, selectedVersions]
    );
    const debouncedOnChange = useMemo(
      () => debounceRequest(onChange, 500),
      [onChange]
    );

    const handleEditorDidMount = (editor: editor.ICodeEditor) => {
      if (editorRef !== null && "current" in editorRef) {
        editorRef.current = editor;
      }
    };

    return (
      <Editor
        {...editorProps}
        onChange={debouncedOnChange}
        onMount={handleEditorDidMount}
      />
    );
  }
);
