import { describe, it, expect } from "vitest";
import {
  EMPTY_CITY_FILTERS,
  filterCities,
  getFilterOptions,
  hasActiveFilters,
} from "../../src/utils/filterCities";
import { createMockCity } from "./test-utils";

describe("filterCities", () => {
  const cities = [
    createMockCity({
      id: "1",
      cityname: "Paris",
      country: "France",
      date: "2024-06-15",
    }),
    createMockCity({
      id: "2",
      cityname: "Tokyo",
      country: "Japan",
      date: "2023-03-10",
    }),
    createMockCity({
      id: "3",
      cityname: "Lyon",
      country: "France",
      date: "2022-11-01",
    }),
  ];

  it("returns all cities when filters are empty", () => {
    expect(filterCities(cities, EMPTY_CITY_FILTERS)).toHaveLength(3);
  });

  it("filters by place name search", () => {
    expect(
      filterCities(cities, { ...EMPTY_CITY_FILTERS, search: "par" }),
    ).toEqual([cities[0]]);
  });

  it("filters by year", () => {
    expect(
      filterCities(cities, { ...EMPTY_CITY_FILTERS, year: "2023" }),
    ).toEqual([cities[1]]);
  });

  it("filters by country", () => {
    expect(
      filterCities(cities, { ...EMPTY_CITY_FILTERS, country: "France" }),
    ).toEqual([cities[0], cities[2]]);
  });

  it("combines search, year, and country filters", () => {
    expect(
      filterCities(cities, {
        search: "ly",
        year: "2022",
        country: "France",
      }),
    ).toEqual([cities[2]]);
  });
});

describe("getFilterOptions", () => {
  it("returns sorted unique years and countries", () => {
    const cities = [
      createMockCity({ country: "France", date: "2024-01-01" }),
      createMockCity({ country: "Japan", date: "2022-05-05" }),
      createMockCity({ country: "France", date: "2023-08-08" }),
    ];

    expect(getFilterOptions(cities)).toEqual({
      years: ["2024", "2023", "2022"],
      countries: ["France", "Japan"],
    });
  });
});

describe("hasActiveFilters", () => {
  it("detects active filters", () => {
    expect(hasActiveFilters(EMPTY_CITY_FILTERS)).toBe(false);
    expect(hasActiveFilters({ ...EMPTY_CITY_FILTERS, search: "Paris" })).toBe(
      true,
    );
    expect(hasActiveFilters({ ...EMPTY_CITY_FILTERS, year: "2024" })).toBe(
      true,
    );
    expect(
      hasActiveFilters({ ...EMPTY_CITY_FILTERS, country: "France" }),
    ).toBe(true);
  });
});
