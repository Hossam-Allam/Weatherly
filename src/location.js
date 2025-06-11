import { handleWeather } from "./ weather.js";
const loader = document.querySelector(".loader");
const appContent = document.querySelector(".app-content");

export let current;

function showLoader() {
  loader.classList.remove("hidden");
  loader.classList.add("shown");
  appContent.classList.add("blur");
}

function hideLoader() {
  loader.classList.remove("shown");
  loader.classList.add("hidden");
  appContent.classList.remove("blur");
}

function requestAndShowLocalWeather() {
  if (!navigator.geolocation) {
    console.warn("Geolocation not supported by this browser.");
    return;
  }
  showLoader();
  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      const { latitude, longitude } = coords;

      const resp = await fetch(
        `https://us1.locationiq.com/v1/reverse?` +
          `key=pk.c1031754160ee83693d410c25b29d8c7` + //free key bud, get one yourself
          `&lat=${latitude}&lon=${longitude}` +
          `&format=json`
      );
      if (!resp.ok) throw new Error(`Geo lookup failed: ${resp.status}`);
      const place = await resp.json();

      const city =
        place.address.city ||
        place.address.town ||
        place.address.village ||
        place.display_name;
      current = city;
      hideLoader();
      handleWeather(city);
    },
    (err) => {
      console.warn("Geolocation denied or failed:", err);
      hideLoader();
      handleWeather("London");
    },
    { timeout: 10_000 }
  );
}

requestAndShowLocalWeather();
