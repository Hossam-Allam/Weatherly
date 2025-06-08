import { handleWeather, printForecast } from "./ weather";

const celcius = document.querySelector(".celcius");
const fahrenheit = document.querySelector(".fahrenheit");
const input = document.querySelector("#location");

celcius.addEventListener("click", () => {
  let query = input.value;
  handleWeather(query, "metric");
  input.value = "";
});

fahrenheit.addEventListener("click", () => {
  let query = input.value;
  handleWeather(query, "us");
  input.value = "";
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = input.value;
    handleWeather(query, "metric");
    input.value = "";
  }
});
