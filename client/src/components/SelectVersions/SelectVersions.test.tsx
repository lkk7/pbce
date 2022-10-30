import { render, screen } from "@testing-library/react";
import { strings } from "strings";
import { SelectVersions } from "./SelectVersions";

describe("SelectVersions", () => {
  test("should render", () => {
    render(<SelectVersions data={["a1", "b2", "c3"]} />);

    expect(screen.getByText(strings.pickPyVersions)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(strings.pickPyVersions)
    ).toBeInTheDocument();
  });
});
