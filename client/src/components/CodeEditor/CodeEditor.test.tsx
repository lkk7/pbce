import { render, screen } from "testUtils";
import { CodeEditor } from "./CodeEditor";

describe("DisassembleResults", () => {
  it("starts the editor correctly", () => {
    render(<CodeEditor />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });
});
