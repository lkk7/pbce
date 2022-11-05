import React, { useMemo } from "react";
import { Code, createStyles, Table, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import { instructionsSelector } from "store/slices/instructions";
import { strings } from "strings";
import { useMediaQuery } from "@mantine/hooks";

export const useStyles = createStyles((theme) => ({
  code: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: `10px`,
    },
  },
}));

export const DisassembleResults = () => {
  const instructionsForVersions = useSelector(instructionsSelector);
  const { classes, theme } = useStyles();
  const mediaQuery = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const resultsToRender = useMemo(
    () =>
      Object.entries(instructionsForVersions).map(([version, instructions]) => (
        <tr key={version}>
          <td>{version}</td>
          <td>
            <Code className={classes.code} block>
              {instructions}
            </Code>
          </td>
        </tr>
      )),
    [classes.code, instructionsForVersions]
  );

  return resultsToRender.length ? (
    <React.Fragment>
      <Title order={3}>{strings.results}</Title>
      <Table
        fontSize={mediaQuery ? "xs" : "md"}
        horizontalSpacing={mediaQuery ? "xs" : 0}
        cellPadding={0}
      >
        <thead>
          <tr>
            <th>{strings.pyVersion}</th>
            <th>{strings.results}</th>
          </tr>
        </thead>
        <tbody>{resultsToRender}</tbody>
      </Table>
    </React.Fragment>
  ) : null;
};
