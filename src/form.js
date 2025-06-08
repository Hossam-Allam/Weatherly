import { handleWeather, printForecast } from "./ weather";

const button = document.querySelector(".submit");
const input = document.querySelector("#location");

button.addEventListener("click", () => {
  let query = input.value;
  handleWeather(query);
  input.value = "";
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = input.value;
    handleWeather(query, "metric");
    input.value = "";
  }
});
