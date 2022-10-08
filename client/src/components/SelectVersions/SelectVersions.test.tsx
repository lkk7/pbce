import { render, screen } from "@testing-library/react";
import { SelectVersions } from "./SelectVersions";

describe("SelectVersions", () => {
  test("should render", () => {
    render(<SelectVersions data={["a1", "b2", "c3"]} />);

    expect(screen.getByText("Pick Python version(s)")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Python version(s)")
    ).toBeInTheDocument();
  });
});
