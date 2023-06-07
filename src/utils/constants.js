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

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const weatherOptions = [
  { url: daySunnyPath, day: true, type: "sunny" },
  {
    url: dayCloudyPath,
    day: true,
    type: "cloudy",
  },
  {
    url: dayRainPath,
    day: true,
    type: "rain",
  },
  {
    url: dayStormPath,
    day: true,
    type: "storm",
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
    type: "cloudy",
  },
  {
    url: nightRainPath,
    day: false,
    type: "rain",
  },
  {
    url: nightStormPath,
    day: false,
    type: "storm",
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
