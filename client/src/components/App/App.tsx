import { AppShell, Container, Header } from "@mantine/core";
import { SelectVersions } from "components/SelectVersions";
import { CodeEditor } from "components/CodeEditor";
import { DisassembleResults } from "components/DisassembleResults";

export const App = () => {
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
        <CodeEditor />
        <SelectVersions p="md" />
        <DisassembleResults />
      </Container>
    </AppShell>
  );
};
