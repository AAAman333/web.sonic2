document.addEventListener("DOMContentLoaded", () => {
  const weatherInfo = document.getElementById("weather-info");
  const factContainer = document.getElementById("flower-fact");

  fetch("/weather")
    .then(res => res.json())
    .then(data => {
      if (!data || data.error) {
        weatherInfo.innerHTML = "Weather unavailable 🌧";
      } else {
        const temp = Math.round(data.temperature);
        const feelsLike = Math.round(data.feels_like);
        const description = data.description;
        const wind = data.wind_speed;
        const rain = data.rain_3h ?? 0;

        weatherInfo.innerHTML = `
          <span class="temp">🌡 ${temp}°C (feels like ${feelsLike}°C)</span>
          <span class="desc">☁ ${description}</span>
          <span class="details">
            💨 Wind: ${wind} m/s | 🌧 Rain (3h): ${rain} mm
          </span>
        `;
      }

      return fetch("/random-fact");
    })
    .then(res => res.json())
    .then(data => {
      if (!data || data.error) {
        factContainer.textContent = "No fact available today 🌱";
      } else {
        factContainer.textContent = data.fact;
      }
    })
    .catch(err => {
      console.error(err);
      factContainer.textContent = "No fact available today 🌱";
    });
});
