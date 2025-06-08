async function weather(query = null) {
  let response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      query +
      "?key=SHHUH7CD3GXP3GU82B62U8LB9",
    { mode: "cors" }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  let data = await response.json();
  let description = data.description;
  console.log(description);
}

export const handleWeather = function handleWeather(query) {
  weather(query).catch((error) => {
    console.error("Failed to fetch weather data:", error.message);
  });
};
