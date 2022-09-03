import {render, screen} from "@testing-library/react";

import Footer from "./Footer";

it("should match snapshot", () => {
  render(<Footer />);
  const footer = screen.getByTestId("footer");
  expect(footer).toMatchSnapshot();
});
