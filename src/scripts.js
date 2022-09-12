function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#day-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let apiKey = "ea9f14208e3310b361d14a1f519c90a9";
let units = "metric";

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

getDefaultTemp();

function getDefaultTemp() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=2158177&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${searchInput.value}`;
  let units = "metric";
  let apiKey = "ea9f14208e3310b361d14a1f519c90a9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let search = document.querySelector("#city-form");
search.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentLocation = response.data.name;
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let displayCity = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let weatherdesc = document.querySelector("#weather-desc");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let mainIconElement = document.querySelector("#main-icon");
  displayCity.innerHTML = `${currentLocation}`;
  celsiusTemperature = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${temperature}°C`;
  weatherdesc.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `${windSpeed}km/h`;
  humidityElement.innerHTML = `${humidity}%`;
  mainIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "ea9f14208e3310b361d14a1f519c90a9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div
        class="row card-block d-flex justify-content-center align-items-center"
      >`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-sm text-center">
          <div class="card weather-cards">
            <div class="card-body">
              <h5 class="card-title forecast-day">${formatDay(
                forecastDay.dt
              )}</h5>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" class="forecast-icon"/>
              <p class="card-text"><span class="forecast-max">${Math.round(
                forecastDay.temp.max
              )}°C</span> | <span class="forecast-min">${Math.round(
          forecastDay.temp.min
        )}°C</span></p>
            </div>
          </div>
    </div>`;
    }
    forecastElement.innerHTML = forecastHTML + `</div>`;
  });
}
