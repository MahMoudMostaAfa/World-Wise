import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../hooks/UseCitiesContext";
function CountryList() {
  const { isLoading, cities } = useCities();
  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country))
  //     return [...arr, { emoji: city.emoji, country: city.country }];
  //   else return arr;
  // }, []);
  const knownCountries = new Set();
  const countries = cities.flatMap(({ country, emoji }) => {
    if (!knownCountries.has(country)) {
      knownCountries.add(country);
      return [{ country, emoji }];
    } else return [];
  });

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message={"please start the app by adding some cities "} />;
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
