import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../Components/Home";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("renders Home component", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    screen.debug();
  });
});
