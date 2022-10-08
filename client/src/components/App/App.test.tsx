import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  test("should render", () => {
    render(<App />);

    expect(screen.getByText("Pick Python version(s)")).toBeInTheDocument();
  });
});
