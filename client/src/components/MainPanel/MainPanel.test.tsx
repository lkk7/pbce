import { render, screen } from "@testing-library/react";
import { strings } from "strings";
import { MainPanel } from "./MainPanel";

describe("MainPanel", () => {
  test("should render", () => {
    render(<MainPanel />);

    expect(screen.getByText(strings.pickPyVersions)).toBeInTheDocument();
  });
});
