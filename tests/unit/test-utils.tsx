import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { City } from "../../src/components/City";

export function createMockCity(overrides: Partial<City> = {}): City {
  return {
    id: "city-1",
    cityname: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    date: "2024-01-15",
    emoji: "🇫🇷",
    notes: "Great trip",
    ...overrides,
  };
}

export function renderWithRouter(
  ui: ReactElement,
  { route = "/", ...options }: RenderOptions & { route?: string } = {},
) {
  return render(
    <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>,
    options,
  );
}
