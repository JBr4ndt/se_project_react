import "../blocks/WeatherCard.css";
import { weatherOptions } from "../utils/constants";

const WeatherCard = ({
  day,
  type,
  weatherTemp = "",
  currentTemperatureUnit,
}) => {
  const imageSrc = weatherOptions.filter((item) => {
    return item.day === day && item.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section className="weather">
      <div className="weather__temp">
        {weatherTemp}°{currentTemperatureUnit}
      </div>
      <img src={imageSrcUrl} alt="weather card" className="weather__image" />
    </section>
  );
};

export default WeatherCard;
