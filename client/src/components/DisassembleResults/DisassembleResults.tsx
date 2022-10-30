import { Accordion, Code, createStyles } from "@mantine/core";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { instructionsSelector } from "store/slices/instructions";

export const useStyles = createStyles(() => ({
  noBullets: {
    listStyleType: "none",
  },
  instructionProperty: {
    display: "inline",
    paddingRight: "5px",
  },
}));

export const DisassembleResults = () => {
  const instructionsForVersions = useSelector(instructionsSelector);

  const resultsToRender = useMemo(() => {
    return Object.entries(instructionsForVersions).map(
      ([version, instructions]) => {
        console.log(instructions);
        return (
          <Accordion.Item value={version} key={version}>
            <Accordion.Control>{version}</Accordion.Control>
            <Accordion.Panel>
              <Code block>{instructions}</Code>
            </Accordion.Panel>
          </Accordion.Item>
        );
      }
    );
  }, [instructionsForVersions]);

  return <Accordion pt="md">{resultsToRender}</Accordion>;
};
