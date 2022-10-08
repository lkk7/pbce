import { AppShell, Header } from "@mantine/core";
import { SelectVersions } from "components/SelectVersions";
import { CodeEditor } from "components/CodeEditor";

export const App = () => {
  return (
    <AppShell
      header={
        <Header height={60} p="xs">
          Header
        </Header>
      }
    >
      <SelectVersions />
      <CodeEditor />
    </AppShell>
  );
};
