import { AppShell, Header } from "@mantine/core";
import Editor, { EditorProps } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { api } from "../../api";
import { SelectVersions } from "../SelectVersions";

const editorProps: EditorProps = {
  width: "100%",
  height: "50vh",
  language: "cpp",
  theme: "vs-dark",
};

export const App = () => {
  const [versions, setVersions] = useState<string[]>([]);

  useEffect(() => {
    api.getVersions().then((result) => setVersions(result));
  }, []);

  return (
    <AppShell
      header={
        <Header height={60} p="xs">
          Header
        </Header>
      }
    >
      <SelectVersions data={versions} />
      <Editor {...editorProps} />
    </AppShell>
  );
};
