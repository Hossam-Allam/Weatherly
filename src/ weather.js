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

  // const tempUnit = unit === "us" ? "°F" : "°C";
  // const speedUnit = unit === "us" ? "mph" : "km/h";

  // data.days.slice(0, 5).forEach((day, idx) => {
  //   console.log(`Day ${idx + 1} (${day.datetime}):`);
  //   console.log(
  //     `  • Temp: ${day.temp}${tempUnit} (Feels like ${day.feelslike}${tempUnit})`
  //   );
  //   console.log(`  • Conditions: ${day.conditions}`);
  //   console.log(`  • Wind: ${day.windspeed}${speedUnit}`);
  //   console.log("---");
  // });
}

export const handleWeather = function handleWeather(query, unit) {
  weather(query, unit)
    .then(printForecast)
    .catch((error) => {
      console.error("Failed to fetch weather data:", error.message);
    });
};
