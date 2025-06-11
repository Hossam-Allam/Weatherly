import "./styles.css";
import "./form.js";
import { handleWeather } from "./ weather.js";

function requestAndShowLocalWeather() {
  if (!navigator.geolocation) {
    console.warn("Geolocation not supported by this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      const { latitude, longitude } = coords;

      // 2) Reverse-geocode to get a human city name
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

      handleWeather(city);
    },
    (err) => {
      console.warn("Geolocation denied or failed:", err);
    },
    { timeout: 10_000 }
  );
}

requestAndShowLocalWeather();
