import { strings } from "strings";
import { render, screen } from "testUtils";
import { MainPanel } from "./MainPanel";

describe("MainPanel", () => {
  it("renders correctly", () => {
    render(<MainPanel />);

    expect(screen.getByText("PBCE")).toBeInTheDocument();
    expect(screen.getByText(strings.pickPyVersions)).toBeInTheDocument();
  });
});
