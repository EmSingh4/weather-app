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
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=2158177&appid=${apiKey}&units=${units}`;

function defaultTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let tempElement = document.querySelector("#temperature");
  let weatherdesc = document.querySelector("#weather-desc");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let mainIconElement = document.querySelector("#main-icon");
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
}
axios.get(apiUrl).then(defaultTemperature);

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
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let tempElement = document.querySelector("#temperature");
  let weatherdesc = document.querySelector("#weather-desc");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let mainIconElement = document.querySelector("#main-icon");
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
}

function showCurrentLocationTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentLocation = response.data.name;
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let displayCity = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let mainIconElement = document.querySelector("#main-icon");
  celsiusTemperature = Math.round(response.data.main.temp);
  displayCity.innerHTML = `${currentLocation}`;
  tempElement.innerHTML = `${currentTemp}°C`;
  windElement.innerHTML = `${windSpeed}km/h`;
  humidityElement.innerHTML = `${humidity}%`;
  mainIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIconElement.setAttribute("alt", response.data.weather[0].description);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "ea9f14208e3310b361d14a1f519c90a9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentLocationTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheitTempRounded = Math.round(fahrenheitTemp);
  let fahrenheitElement = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  fahrenheitElement.innerHTML = `${fahrenheitTempRounded}°F`;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#temperature");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  celsiusTemp.innerHTML = `${celsiusTemperature}°C`;
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

let celsiusTemperature = null;

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div
        class="row card-block d-flex justify-content-center align-items-center"
      >`;
  let days = [
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-sm text-center">
          <div class="card weather-cards">
            <div class="card-body">
              <h5 class="card-title forecast-day">${day}</h5>
              <img src="http://openweathermap.org/img/wn/50d@2x.png" class="forecast-icon"/>
              <p class="card-text"><span class="forecast-max">8°C</span> | <span class="forecast-min">18°C</span></p>
            </div>
          </div>
    </div>`;
    forecastElement.innerHTML = forecastHTML + `</div>`;
  });
}

displayForecast();
