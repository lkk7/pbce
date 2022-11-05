import { strings } from "strings";
import { render, screen } from "testUtils";
import { SelectVersions } from "./SelectVersions";

describe("SelectVersions", () => {
  it("renders correctly", () => {
    render(<SelectVersions data={["a1", "b2", "c3"]} />);

    expect(screen.getByText(strings.pickPyVersions)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(strings.pickPyVersions)
    ).toBeInTheDocument();
  });
});
