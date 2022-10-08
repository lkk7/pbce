import { AppShell, Header } from "@mantine/core";
import { useState, useEffect } from "react";
import { api } from "api";
import { SelectVersions } from "components/SelectVersions";
import { CodeEditor } from "components/CodeEditor";

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
      <CodeEditor />
    </AppShell>
  );
};
