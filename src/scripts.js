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
  let lowTemp = Math.round(response.data.main.temp_min);
  let highTemp = Math.round(response.data.main.temp_max);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let tempElement = document.querySelector("#temperature");
  let weatherdesc = document.querySelector("#weather-desc");
  let todayLow = document.querySelector("#today-low");
  let todayHigh = document.querySelector("#today-high");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  tempElement.innerHTML = `${temperature}°C`;
  weatherdesc.innerHTML = response.data.weather[0].description;
  todayLow.innerHTML = `${lowTemp}°C`;
  todayHigh.innerHTML = `${highTemp}°C`;
  windElement.innerHTML = `${windSpeed}km/h`;
  humidityElement.innerHTML = `${humidity}%`;
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
  let lowTemp = Math.round(response.data.main.temp_min);
  let highTemp = Math.round(response.data.main.temp_max);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let tempElement = document.querySelector("#temperature");
  let weatherdesc = document.querySelector("#weather-desc");
  let todayLow = document.querySelector("#today-low");
  let todayHigh = document.querySelector("#today-high");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  tempElement.innerHTML = `${temperature}°C`;
  weatherdesc.innerHTML = response.data.weather[0].description;
  todayLow.innerHTML = `${lowTemp}°C`;
  todayHigh.innerHTML = `${highTemp}°C`;
  windElement.innerHTML = `${windSpeed}km/h`;
  humidityElement.innerHTML = `${humidity}%`;
}

function showCurrentLocationTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentLocation = response.data.name;
  let lowTemp = Math.round(response.data.main.temp_min);
  let highTemp = Math.round(response.data.main.temp_max);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let displayCity = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let todayLow = document.querySelector("#today-low");
  let todayHigh = document.querySelector("#today-high");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  displayCity.innerHTML = `${currentLocation}`;
  tempElement.innerHTML = `${currentTemp}°C`;
  todayLow.innerHTML = `${lowTemp}°C`;
  todayHigh.innerHTML = `${highTemp}°C`;
  windElement.innerHTML = `${windSpeed}km/h`;
  humidityElement.innerHTML = `${humidity}%`;
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
