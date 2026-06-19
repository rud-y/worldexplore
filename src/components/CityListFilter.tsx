import styles from "./CityListFilter.module.css";
import type { CityFilters } from "../utils/filterCities";
import { hasActiveFilters } from "../utils/filterCities";

type CityListFilterProps = {
  filters: CityFilters;
  years: string[];
  countries: string[];
  onFiltersChange: (filters: CityFilters) => void;
};

export default function CityListFilter({
  filters,
  years,
  countries,
  onFiltersChange,
}: CityListFilterProps) {
  function handleClear() {
    onFiltersChange({ search: "", year: "", country: "" });
  }

  return (
    <form
      aria-label="Filter places"
      className={styles.filter}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.searchRow}>
        <label htmlFor="city-search">Search places</label>
        <input
          id="city-search"
          type="search"
          placeholder="Quick search by place name..."
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
        />
      </div>

      <div className={styles.filtersRow}>
        <div className={styles.field}>
          <label htmlFor="city-year">Year</label>
          <select
            id="city-year"
            value={filters.year}
            onChange={(e) =>
              onFiltersChange({ ...filters, year: e.target.value })
            }
          >
            <option value="">All years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="city-country">Country</label>
          <select
            id="city-country"
            value={filters.country}
            onChange={(e) =>
              onFiltersChange({ ...filters, country: e.target.value })
            }
          >
            <option value="">All countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters(filters) && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
