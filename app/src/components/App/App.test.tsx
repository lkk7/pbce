import { render } from "@testing-library/preact";
import App from "./App";
import { h } from "preact";

describe("App", () => {
  test("should render", () => {
    const { container } = render(<App />);

    expect(container.textContent).toEqual("Test!!!");
  });
});
