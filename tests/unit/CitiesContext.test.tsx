import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { CitiesProvider, useCities } from "../../src/contexts/CitiesContext";
import { createMockCity } from "./test-utils";
import { supabase } from "../../src/services/supabase";
import { useAuth } from "../../src/contexts/useAuth";

vi.mock("../../src/services/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

vi.mock("../../src/contexts/useAuth", () => ({
  useAuth: vi.fn(),
}));

const mockFrom = vi.mocked(supabase.from);
const mockUseAuth = vi.mocked(useAuth);

function CitiesProbe() {
  const { cities, isLoading, currentCity, getCity, createCity, deleteCity } =
    useCities();

  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="cities-count">{cities.length}</span>
      <span data-testid="current-city">{currentCity?.cityname ?? "none"}</span>
      <button onClick={() => getCity("city-1")}>get-city</button>
      <button
        onClick={() =>
          createCity({
            cityname: "Berlin",
            country: "Germany",
            lat: 52.52,
            lng: 13.405,
            emoji: "🇩🇪",
            date: "2024-06-01",
            notes: "",
          })
        }
      >
        create-city
      </button>
      <button onClick={() => deleteCity("city-1")}>delete-city</button>
    </div>
  );
}

function setupListQuery(data: unknown) {
  mockFrom.mockReturnValue({
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockResolvedValue({ data, error: null }),
    }),
  } as never);
}

function setupInsertQuery(data: unknown) {
  mockFrom.mockReturnValue({
    insert: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data, error: null }),
      }),
    }),
  } as never);
}

function setupDeleteQuery() {
  mockFrom.mockReturnValue({
    delete: vi.fn().mockReturnValue({
      eq: vi.fn().mockResolvedValue({ data: null, error: null }),
    }),
  } as never);
}

describe("CitiesContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: { id: "user-1" } } as never);
  });

  it("throws when useCities is used outside CitiesProvider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<CitiesProbe />)).toThrow(
      "CitiesContext was used outside of CitiesProvider !!",
    );

    consoleError.mockRestore();
  });

  it("loads cities for the authenticated user", async () => {
    const cities = [
      createMockCity({ id: "city-1" }),
      createMockCity({ id: "city-2", cityname: "Tokyo" }),
    ];
    setupListQuery(cities);

    render(
      <CitiesProvider>
        <CitiesProbe />
      </CitiesProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("cities-count")).toHaveTextContent("2");
    });
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    expect(mockFrom).toHaveBeenCalledWith("cities");
  });

  it("clears cities when there is no authenticated user", async () => {
    mockUseAuth.mockReturnValue({ user: null } as never);

    render(
      <CitiesProvider>
        <CitiesProbe />
      </CitiesProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("cities-count")).toHaveTextContent("0");
    });
    expect(mockFrom).not.toHaveBeenCalled();
  });

  it("loads a single city with getCity", async () => {
    const city = createMockCity({ id: "city-1", cityname: "Paris" });

    mockFrom
      .mockReturnValueOnce({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: [], error: null }),
        }),
      } as never)
      .mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: city, error: null }),
          }),
        }),
      } as never);

    render(
      <CitiesProvider>
        <CitiesProbe />
      </CitiesProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("cities-count")).toHaveTextContent("0");
    });

    await act(async () => {
      screen.getByRole("button", { name: "get-city" }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("current-city")).toHaveTextContent("Paris");
    });
  });

  it("creates a city and adds it to state", async () => {
    const createdCity = createMockCity({ id: "city-new", cityname: "Berlin" });
    setupListQuery([]);
    setupInsertQuery(createdCity);

    render(
      <CitiesProvider>
        <CitiesProbe />
      </CitiesProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    mockFrom.mockClear();
    setupInsertQuery(createdCity);

    await act(async () => {
      screen.getByRole("button", { name: "create-city" }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("cities-count")).toHaveTextContent("1");
      expect(screen.getByTestId("current-city")).toHaveTextContent("Berlin");
    });
  });

  it("deletes a city from state", async () => {
    const cities = [createMockCity({ id: "city-1", cityname: "Paris" })];
    setupListQuery(cities);

    render(
      <CitiesProvider>
        <CitiesProbe />
      </CitiesProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("cities-count")).toHaveTextContent("1");
    });

    mockFrom.mockClear();
    setupDeleteQuery();

    await act(async () => {
      screen.getByRole("button", { name: "delete-city" }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("cities-count")).toHaveTextContent("0");
      expect(screen.getByTestId("current-city")).toHaveTextContent("none");
    });
  });
});
