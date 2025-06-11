import { ICON_MAP } from "./iconmap";

const city = document.querySelector(".city");
const description = document.querySelector(".description");
const temp = document.querySelector(".temp");
const max = document.querySelector(".high");
const low = document.querySelector(".low");
const humidity = document.querySelector(".h-value");
const uv = document.querySelector(".uv-value");
const loader = document.querySelector(".loader");
const appContent = document.querySelector(".app-content");

async function weather(query = null, unit = "metric") {
  let response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      encodeURIComponent(query) +
      "?key=SHHUH7CD3GXP3GU82B62U8LB9&unitGroup=" +
      unit,
    { mode: "cors" }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  let data = await response.json();

  return { data, unit };
}

export function printForecast({ data, unit }) {
  console.log(data);
  const tempUnit = unit === "us" ? "°F" : "°C";
  let today = data.days[0];
  city.innerHTML = data.resolvedAddress;
  description.innerHTML = today.description;
  temp.innerHTML = `${today.temp}${tempUnit}`;

  const iconName = data.currentConditions.icon;
  const iconURL = ICON_MAP[iconName] || ICON_MAP["default"];

  let iconEl = document.querySelector(".weather-icon");
  if (!iconEl) {
    iconEl = document.createElement("img");
    iconEl.classList.add("weather-icon");
    temp.insertAdjacentElement("afterend", iconEl);
  }
  iconEl.src = `${iconURL}`;
  iconEl.alt = iconName;

  max.innerHTML = `${today.tempmax}${tempUnit}`;
  low.innerHTML = `${today.tempmin}${tempUnit}`;

  humidity.innerHTML = data.currentConditions.humidity + "%";
  uv.innerHTML = data.currentConditions.uvindex;
}

export const handleWeather = function handleWeather(query, unit) {
  loader.classList.remove("hidden");
  loader.classList.add("shown");
  appContent.classList.add("blur");

  weather(query, unit)
    .then(printForecast)
    .catch((error) => {
      console.error("Failed to fetch weather data:", error.message);
    })
    .finally(() => {
      // 2) hide spinner and blur
      loader.classList.remove("shown");
      loader.classList.add("hidden");
      appContent.classList.remove("blur");
    });
};
