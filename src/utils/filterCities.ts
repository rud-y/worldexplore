import type { City } from "../components/City";

export type CityFilters = {
  search: string;
  year: string;
  country: string;
};

export const EMPTY_CITY_FILTERS: CityFilters = {
  search: "",
  year: "",
  country: "",
};

function getCityYear(date?: string | Date | null): string | null {
  if (!date) return null;
  const year = new Date(date).getFullYear();
  return isNaN(year) ? null : String(year);
}

export function getFilterOptions(cities: City[]) {
  const years = new Set<string>();
  const countries = new Set<string>();

  for (const city of cities) {
    if (city.country) countries.add(city.country);

    const year = getCityYear(city.date);
    if (year) years.add(year);
  }

  return {
    years: [...years].sort((a, b) => Number(b) - Number(a)),
    countries: [...countries].sort(),
  };
}

export function filterCities(cities: City[], filters: CityFilters): City[] {
  const search = filters.search.trim().toLowerCase();

  return cities.filter((city) => {
   const matchesSearch =
     !search || city.cityname.toLowerCase().includes(search);
   const matchesYear = !filters.year || getCityYear(city.date) === filters.year;
   const matchesCountry = !filters.country || city.country === filters.country;

   return matchesSearch && matchesYear && matchesCountry;
  });
}

export function hasActiveFilters(filters: CityFilters): boolean {
  return Boolean(filters.search.trim() || filters.year || filters.country);
}
