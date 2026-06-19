import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import City from "../../src/components/City";
import { createMockCity } from "./test-utils";
import { useCities } from "../../src/contexts/CitiesContext";
import { useNavigate, useParams } from "react-router-dom";

vi.mock("../../src/contexts/CitiesContext", () => ({
  useCities: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

const mockUseCities = vi.mocked(useCities);
const mockUseParams = vi.mocked(useParams);
const mockUseNavigate = vi.mocked(useNavigate);

describe("City", () => {
  const getCity = vi.fn();
  const navigate = vi.fn();

  beforeEach(() => {
    getCity.mockClear();
    navigate.mockClear();
    mockUseParams.mockReturnValue({ id: "city-1" });
    mockUseNavigate.mockReturnValue(navigate);
    mockUseCities.mockReturnValue({
      cities: [],
      isLoading: false,
      currentCity: createMockCity(),
      getCity,
      createCity: vi.fn(),
      updateCity: vi.fn(),
      deleteCity: vi.fn(),
    });
  });

  it("fetches the city on mount when an id is present", () => {
    render(<City />);

    expect(getCity).toHaveBeenCalledWith("city-1");
  });

  it("shows a spinner while loading", () => {
    mockUseCities.mockReturnValue({
      cities: [],
      isLoading: true,
      currentCity: null,
      getCity,
      createCity: vi.fn(),
      updateCity: vi.fn(),
      deleteCity: vi.fn(),
    });

    render(<City />);

    expect(screen.queryByText(/You went to/)).not.toBeInTheDocument();
    expect(screen.queryByText(/You are going to/)).not.toBeInTheDocument();
  });

  it("renders city details for a past visit", () => {
    const currentCity = createMockCity({
      cityname: "Paris",
      emoji: "🇫🇷",
      date: "2024-01-15",
      notes: "Loved the museums",
    });

    mockUseCities.mockReturnValue({
      cities: [],
      isLoading: false,
      currentCity,
      getCity,
      createCity: vi.fn(),
      updateCity: vi.fn(),
      deleteCity: vi.fn(),
    });

    render(<City />);

    expect(screen.getByText("🇫🇷")).toBeInTheDocument();
    expect(screen.getByText(/You went to Paris on/)).toBeInTheDocument();
    expect(screen.getByText("Monday, January 15, 2024")).toBeInTheDocument();
    expect(screen.getByText("Loved the museums")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Check out Paris on Wikipedia/i }),
    ).toHaveAttribute("href", "https://en.wikipedia.org/wiki/Paris");
  });

  it("uses future-tense copy for upcoming visits", () => {
    const currentCity = createMockCity({
      cityname: "Tokyo",
      date: "2099-12-31",
      notes: "",
    });

    mockUseCities.mockReturnValue({
      cities: [],
      isLoading: false,
      currentCity,
      getCity,
      createCity: vi.fn(),
      updateCity: vi.fn(),
      deleteCity: vi.fn(),
    });

    render(<City />);

    expect(screen.getByText(/You are going to Tokyo on/)).toBeInTheDocument();
    expect(screen.queryByText("Your notes")).not.toBeInTheDocument();
  });

  it("navigates to the edit form when Edit city info is clicked", async () => {
    const user = userEvent.setup();
    const currentCity = createMockCity({
      id: "city-1",
      lat: 48.8566,
      lng: 2.3522,
    });

    mockUseCities.mockReturnValue({
      cities: [],
      isLoading: false,
      currentCity,
      getCity,
      createCity: vi.fn(),
      updateCity: vi.fn(),
      deleteCity: vi.fn(),
    });

    render(<City />);

    await user.click(screen.getByRole("button", { name: "Edit city info" }));

    expect(navigate).toHaveBeenCalledWith(
      "/app/form/city-1?lat=48.8566&lng=2.3522",
    );
  });
});
