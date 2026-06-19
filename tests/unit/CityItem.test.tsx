import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CityItem from "../../src/components/CityItem";
import { createMockCity, renderWithRouter } from "./test-utils";

describe("CityItem", () => {
  const onDeleteRequest = vi.fn();

  beforeEach(() => {
    onDeleteRequest.mockClear();
  });

  it("renders city name, emoji, and formatted date", () => {
    const city = createMockCity();

    renderWithRouter(
      <CityItem city={city} onDeleteRequest={onDeleteRequest} />,
    );

    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("🇫🇷")).toBeInTheDocument();
    expect(screen.getByText("Monday, January 15, 2024")).toBeInTheDocument();
  });

  it("links to the city detail route with coordinates", () => {
    const city = createMockCity({ id: "city-42", lat: 40.7, lng: -74.0 });

    renderWithRouter(
      <CityItem city={city} onDeleteRequest={onDeleteRequest} />,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/city-42?lat=40.7&lng=-74");
  });

  it("shows Unknown Date when date is missing", () => {
    const city = createMockCity({ date: undefined });

    renderWithRouter(
      <CityItem city={city} onDeleteRequest={onDeleteRequest} />,
    );

    expect(screen.getByText("Unknown Date")).toBeInTheDocument();
  });

  it("calls onDeleteRequest with the city when delete is clicked", async () => {
    const user = userEvent.setup();
    const city = createMockCity();

    renderWithRouter(
      <CityItem city={city} onDeleteRequest={onDeleteRequest} />,
    );

    await user.click(
      screen.getByRole("button", { name: "Delete item: Paris" }),
    );

    expect(onDeleteRequest).toHaveBeenCalledTimes(1);
    expect(onDeleteRequest).toHaveBeenCalledWith(city);
  });
});
