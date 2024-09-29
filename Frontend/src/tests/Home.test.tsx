import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Home from "../Components/Home";

describe("Home Component", () => {
  beforeEach(() => {
    // Render the Home component within a MemoryRouter for each test
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  it("renders HeroSection component", () => {
    // Check if the HeroSection component is present
    expect(screen.getByText("Unleash Your Inner Curator")).toBeDefined();
    const button = screen.getByRole("button", { name: "Start Your ArtQuest" });
    expect(button).toBeDefined();
    expect(button.getAttribute("href")).toBe("/explore");
  });

  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useNavigate: vi.fn(),
    };
  });

  it.only("navigates to Explore page when 'Start Your ArtQuest' button is clicked", async () => {
    // Simulate a click on the "Start Your ArtQuest" button
    const navigateMock = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);
    const button = screen.getByRole("button", { name: "Start Your ArtQuest" });
    await userEvent.click(button);
    expect(navigateMock).toHaveBeenCalledWith("/explore");
  });

  it('displays "EXPLORE & COLLECT" section with correct content', () => {
    // Verify the presence of the "EXPLORE & COLLECT" section and its image
    expect(screen.getByText("EXPLORE & COLLECT")).toBeDefined();
    expect(screen.getByAltText(/girl lookin at different arts/)).toBeDefined();
    expect(
      screen.getByText(/Dive into an extensive collection/i)
    ).toBeDefined();
  });

  it('displays "EXHIBITIONS" section with correct content', () => {
    // Check for the "EXHIBITIONS" section, its image, and description
    expect(screen.getByText("EXHIBITIONS")).toBeDefined();
    expect(
      screen.getAllByAltText("two cartoon figures looking at art")
    ).toBeDefined();
    expect(
      screen.getByText(/Create dynamic virtual exhibitions/)
    ).toBeDefined();
  });

  it("renders FeaturedExhibition component", () => {
    // Ensure the FeaturedExhibition component is rendered
    expect(screen.getByTestId("featured-exhibition")).toBeDefined();
  });

  it("contains correct links for explore and exhibitions", () => {
    // Verify that the links to explore and exhibitions pages are present and correct
    const exploreLink = screen.getByRole("link", { name: "EXPLORE & COLLECT" });
    expect(exploreLink.getAttribute("href")).toBe("/explore");

    const exhibitionsLink = screen.getByRole("link", { name: "EXHIBITIONS" });
    expect(exhibitionsLink.getAttribute("href")).toBe("/exhibitions");
  });
});
