import "../blocks/Main.css";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { useMemo, useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.[currentTemperatureUnit] || 85;

  const weatherType = useMemo(
    currentTemperatureUnit === "F"
      ? () => {
          if (temp >= 86) {
            return "hot";
          } else if (temp >= 66 && temp <= 85) {
            return "warm";
          } else if (temp <= 65) {
            return "cold";
          }
        }
      : () => {
          if (temp >= 30) {
            return "hot";
          } else if (temp >= 19 && temp <= 29) {
            return "warm";
          } else if (temp <= 18) {
            return "cold";
          }
        },
    [weatherTemp]
  );

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={true} type="clouds" weatherTemp={temp} />
      <section className="main__clothes">
        <div className="main__info">
          Today is {temp}°{currentTemperatureUnit} / You may want to wear:
        </div>
        <div className="main__items">
          {filteredCards.map((item) => {
            return (
              <ItemCard key={item.id} item={item} onSelectCard={onSelectCard} />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
