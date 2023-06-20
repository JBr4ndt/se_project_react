import daySunnyPath from "../images/day/sunny.svg";
import dayCloudyPath from "../images/day/cloudy.svg";
import dayRainPath from "../images/day/rain.svg";
import dayStormPath from "../images/day/storm.svg";
import daySnowPath from "../images/day/snow.svg";
import dayFogPath from "../images/day/fog.svg";

import nightClearPath from "../images/night/clear.svg";
import nightCloudyPath from "../images/night/cloudy.svg";
import nightRainPath from "../images/night/rain.svg";
import nightStormPath from "../images/night/storm.svg";
import nightSnowPath from "../images/night/snow.svg";
import nightFogPath from "../images/night/fog.svg";

export const latitude = 45.51;
export const longitude = -122.67;
export const APIkey = "28c51f31629d1d843df9c1b0423a08cb";

export const weatherOptions = [
  { url: daySunnyPath, day: true, type: "clear" },
  {
    url: dayCloudyPath,
    day: true,
    type: "clouds",
  },
  {
    url: dayRainPath,
    day: true,
    type: "rain",
  },
  {
    url: dayStormPath,
    day: true,
    type: "thunderstorm",
  },
  {
    url: daySnowPath,
    day: true,
    type: "snow",
  },
  {
    url: dayFogPath,
    day: true,
    type: "fog",
  },
  {
    url: nightClearPath,
    day: false,
    type: "clear",
  },
  {
    url: nightCloudyPath,
    day: false,
    type: "clouds",
  },
  {
    url: nightRainPath,
    day: false,
    type: "rain",
  },
  {
    url: nightStormPath,
    day: false,
    type: "thunderstorm",
  },
  {
    url: nightSnowPath,
    day: false,
    type: "snow",
  },
  {
    url: nightFogPath,
    day: false,
    type: "fog",
  },
];
