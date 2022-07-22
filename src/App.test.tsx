import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("<App />", () => {
  render(<App />);
  const linkElement = screen.getByText(/Trello Clone/i);
  expect(linkElement).toBeInTheDocument();
});
