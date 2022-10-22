import { Paper, SimpleGrid, Text, Timeline } from "@mantine/core";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { instructionsSelector } from "store/slices/instructions";

export const DisassembleResults = () => {
  const instructionsForVersions = useSelector(instructionsSelector);

  const resultsToRender = useMemo(() => {
    return Object.entries(instructionsForVersions).map(
      ([version, instructions]) => {
        return (
          <Paper shadow="xs" key={version} p="xs" withBorder>
            <Text align="center" size="xl" pb="xs">
              {version}
            </Text>
            {typeof instructions === "string" ? (
              instructions
            ) : (
              <Timeline
                lineWidth={2}
                bulletSize={20}
                active={instructions.length}
                color="orange"
              >
                {instructions.map((instruction, index) => {
                  return (
                    <Timeline.Item key={index}>
                      {instruction.opname}({instruction.argrepr})
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            )}
          </Paper>
        );
      }
    );
  }, [instructionsForVersions]);

  return (
    <SimpleGrid p="lg" cols={3}>
      {resultsToRender}
    </SimpleGrid>
  );
};
