import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CityList from "../../src/components/CityList";
import { createMockCity, renderWithRouter } from "./test-utils";
import { useCities } from "../../src/contexts/CitiesContext";

vi.mock("../../src/contexts/CitiesContext", () => ({
  useCities: vi.fn(),
}));

const mockUseCities = vi.mocked(useCities);

describe("CityList", () => {
  const deleteCity = vi.fn();

  beforeEach(() => {
    deleteCity.mockClear();
    mockUseCities.mockReturnValue({
      cities: [],
      isLoading: false,
      currentCity: null,
      getCity: vi.fn(),
      createCity: vi.fn(),
      updateCity: vi.fn(),
      deleteCity,
    });
  });

  it("shows a spinner while loading", () => {
    mockUseCities.mockReturnValue({
      cities: [],
      isLoading: true,
      currentCity: null,
      getCity: vi.fn(),
      createCity: vi.fn(),
      updateCity: vi.fn(),
      deleteCity,
    });

    renderWithRouter(<CityList />);

    expect(screen.queryByText("Places you have visited...")).not.toBeInTheDocument();
  });

  it("shows an empty message when there are no cities", () => {
    renderWithRouter(<CityList />);

    expect(
      screen.getByText("Navigate the map to add your first place"),
    ).toBeInTheDocument();
  });

  it("renders a list of cities", () => {
    const cities = [
      createMockCity({ id: "1", cityname: "Paris" }),
      createMockCity({
        id: "2",
        cityname: "Tokyo",
        emoji: "🇯🇵",
        lat: 35.6762,
        lng: 139.6503,
      }),
    ];

    mockUseCities.mockReturnValue({
      cities,
      isLoading: false,
      currentCity: null,
      getCity: vi.fn(),
      createCity: vi.fn(),
      updateCity: vi.fn(),
      deleteCity,
    });

    renderWithRouter(<CityList />);

    expect(screen.getByText("Places you have visited...")).toBeInTheDocument();
    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
  });

  it("opens a delete confirmation modal and deletes on confirm", async () => {
    const user = userEvent.setup();
    const city = createMockCity({ id: "city-1", cityname: "Paris" });

    mockUseCities.mockReturnValue({
      cities: [city],
      isLoading: false,
      currentCity: null,
      getCity: vi.fn(),
      createCity: vi.fn(),
      updateCity: vi.fn(),
      deleteCity,
    });

    renderWithRouter(<CityList />);

    await user.click(screen.getByRole("button", { name: "Delete item: Paris" }));

    expect(
      screen.getByText("Are you sure you want to delete Paris?"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Yes" }));

    expect(deleteCity).toHaveBeenCalledWith("city-1");
    expect(
      screen.queryByText("Are you sure you want to delete Paris?"),
    ).not.toBeInTheDocument();
  });

  it("closes the delete modal without deleting on cancel", async () => {
    const user = userEvent.setup();
    const city = createMockCity({ cityname: "Paris" });

    mockUseCities.mockReturnValue({
      cities: [city],
      isLoading: false,
      currentCity: null,
      getCity: vi.fn(),
      createCity: vi.fn(),
      updateCity: vi.fn(),
      deleteCity,
    });

    renderWithRouter(<CityList />);

    await user.click(screen.getByRole("button", { name: "Delete item: Paris" }));
    await user.click(screen.getByRole("button", { name: "No" }));

    expect(deleteCity).not.toHaveBeenCalled();
    expect(
      screen.queryByText("Are you sure you want to delete Paris?"),
    ).not.toBeInTheDocument();
  });
});
