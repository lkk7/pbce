import Editor, { EditorProps } from "@monaco-editor/react";

const editorProps: EditorProps = {
  width: "100%",
  height: "50vh",
  language: "python",
  theme: "vs-dark",
};

export const CodeEditor = () => <Editor {...editorProps} />;
