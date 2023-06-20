import { latitude, longitude, APIkey } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temp = Math.ceil(main && main.temp);
  const city = data.name;
  const weatherType = data.weather[0].main;
  const weatherData = {
    temperature: { F: Math.round(temp), C: Math.round(((temp - 32) * 5) / 9) },
    cityName: city,
    weatherCondition: weatherType,
  };

  return weatherData;
};
