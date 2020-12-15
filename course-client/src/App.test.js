import React from "react";
import { render, getByText } from "@testing-library/react";
import App from "./App";

jest.mock("react-query");

test.skip("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/course signup app/i);
});
