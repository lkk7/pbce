import { useRef } from "react";
import { AppShell, Header, Container } from "@mantine/core";
import { CodeEditor } from "components/CodeEditor";
import { DisassembleResults } from "components/DisassembleResults";
import { SelectVersions } from "components/SelectVersions";
import { editor } from "monaco-editor";

export const MainPanel = () => {
  const editorRef = useRef<editor.ICodeEditor>(null);
  return (
    <AppShell
      header={
        <Header height={60} p="md">
          PBCE
        </Header>
      }
      padding="md"
    >
      <Container>
        <CodeEditor ref={editorRef} />
        <SelectVersions ref={editorRef} />
        <DisassembleResults />
      </Container>
    </AppShell>
  );
};
