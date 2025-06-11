import { handleWeather, printForecast } from "./ weather";
import { current } from "./location";
const celcius = document.querySelector(".celcius");
const fahrenheit = document.querySelector(".fahrenheit");
const input = document.querySelector("#location");
const city = document.querySelector(".city");
let unit = "metric";
let query = city.innerHTML == "" ? "Cairo" : city.innerHTML;

const API_KEY = "32175847564948128c630944250906"; //its a free key
const listEl = document.querySelector("#suggestions-list");
let debounceId = null;

//auto complete stuff

input.addEventListener("input", () => {
  clearTimeout(debounceId);
  debounceId = setTimeout(fetchSuggestions, 300);
});

async function fetchSuggestions() {
  const q = input.value.trim();
  if (q.length < 2) {
    listEl.innerHTML = "";
    return;
  }
  const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(
    q
  )}`;
  const res = await fetch(url);
  const items = await res.json();

  listEl.innerHTML = items
    .map((loc) => `<li class="suggestion-item">${loc.name}, ${loc.region}</li>`)
    .join("");

  // allow click-to-select
  listEl.querySelectorAll(".suggestion-item").forEach((li) => {
    li.addEventListener("click", () => {
      query = input.value = li.textContent;
      listEl.innerHTML = "";
      handleWeather(input.value, unit);
      handleButtonClass();
    });
  });
}

// rest of stuff
celcius.addEventListener("click", () => {
  unit = "metric";
  let query = city.innerHTML == "" ? "Cairo" : city.innerHTML;
  handleWeather(query, "metric");
  input.value = "";
  handleButtonClass();
});

fahrenheit.addEventListener("click", () => {
  unit = "us";
  let query = city.innerHTML == "" ? "Cairo" : city.innerHTML;
  handleWeather(query, unit);
  input.value = "";
  handleButtonClass();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    query = input.value;
    handleWeather(query, unit);
    input.value = "";
    handleButtonClass();
  }
});

function handleButtonClass() {
  if (unit === "metric") {
    celcius.classList.add("active");
    fahrenheit.classList.remove("active");
  } else {
    fahrenheit.classList.add("active");
    celcius.classList.remove("active");
  }
}
