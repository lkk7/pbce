import { strings } from "strings";
import { render, screen } from "testUtils";
import { DisassembleResults } from "./DisassembleResults";

describe("DisassembleResults", () => {
  it("renders correctly", () => {
    render(<DisassembleResults />, {
      versions: { selectedVersions: [] },
      instructions: { bytecodeInstructions: { "1.2.3": "mockedInstructions" } },
    });

    expect(screen.getByText(strings.pyVersion)).toBeInTheDocument();
    for (const element of screen.getAllByText(strings.results)) {
      expect(element).toBeInTheDocument();
    }
    expect(screen.getByText("1.2.3")).toBeInTheDocument();
    expect(screen.getByText("mockedInstructions")).toBeInTheDocument();
  });
});
