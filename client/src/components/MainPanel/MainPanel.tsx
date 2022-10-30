import { useRef } from "react";
import { AppShell, Header, Container, createStyles } from "@mantine/core";
import { CodeEditor } from "components/CodeEditor";
import { DisassembleResults } from "components/DisassembleResults";
import { SelectVersions } from "components/SelectVersions";
import { editor } from "monaco-editor";

export const useStyles = createStyles((theme) => ({
  selectVersions: {
    padding: theme.spacing.xl,
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      padding: `${theme.spacing.xl}px ${theme.spacing.xs}px`,
    },
  },
}));

export const MainPanel = () => {
  const editorRef = useRef<editor.ICodeEditor>(null);
  const { classes } = useStyles();
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
        <section>
          <CodeEditor ref={editorRef} />
        </section>
        <section>
          <SelectVersions className={classes.selectVersions} ref={editorRef} />
        </section>
        <section>
          <DisassembleResults />
        </section>
      </Container>
    </AppShell>
  );
};
