import styles from "./CountryItem.module.css";

export interface Country {
 emoji?: string | null,
 country: string,
}

 function CountryItem({ country }: {country: Country}) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
