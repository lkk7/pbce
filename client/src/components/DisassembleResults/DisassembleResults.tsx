import { SimpleGrid, Timeline } from "@mantine/core";
import { useSelector } from "react-redux";
import { instructionsSelector } from "store/slices/instructions";

export const DisassembleResults = () => {
  const instructionsForVersions = useSelector(instructionsSelector);

  return (
    <SimpleGrid p="lg" cols={3}>
      {Object.entries(instructionsForVersions).map(
        ([version, instructions]) => (
          <Timeline
            key={version}
            lineWidth={2}
            bulletSize={20}
            active={instructions.length}
            color="orange"
          >
            {instructions.map((instruction, index) => (
              <Timeline.Item key={index}>{instruction.opname}</Timeline.Item>
            ))}
          </Timeline>
        )
      )}
    </SimpleGrid>
  );
};
