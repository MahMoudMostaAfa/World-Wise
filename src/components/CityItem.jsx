import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../hooks/UseCitiesContext";
//function to format the date using Intl.DateTimeFormat
function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { getFlag, currentCity, deleteCity } = useCities();
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity?.id === id ? styles["cityItem--active"] : ""
        } `}
        to={`${id}?lat=${position.lat}&lng=${position.lng} `}
      >
        <span className={styles.emoji}>
          {/* {emoji} */}
          {getFlag(emoji)}
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
