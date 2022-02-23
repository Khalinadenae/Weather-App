// Feature #1: display the current date and time : Tuesday 16:00
let now = new Date();

let h4 = document.querySelector("h4");
let hour = now.getHours();
let minute = now.getMinutes();

let time = `${hour}: ${minute}`;

h4.innerHTML = `${time}`;

let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();

h2.innerHTML = ` ${day} , ${month} , ${date}`;
//
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

//feature : API integration 5 day forecast
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "Next 5 days";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
  <table class="table table-sm ">
<table class="table table-hover">
  <tbody>
    <tr>
      <th scope="row no-gutters"> </th>
      <th scope="col"><span class="max">${Math.round(
        forecastDay.temp.max
      )}°</span> 
      <span class="min">/${Math.round(forecastDay.temp.min)}°</span </th>
      <th scope="col">  ${formatDay(forecastDay.dt)}  </th>
      <th scope="col"> <img 
 src="http://openweathermap.org/img/wn/${
   forecastDay.weather[0].icon
 }@2x.png" width="35" /> </th>
     
    </tr>
  </tr>
  `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7a8fb47ff40cd23384da3446c5066c54";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let apiKey = "7a8fb47ff40cd23384da3446c5066c54";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}
function showFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#tempCF");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempCF");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//current location button

function onSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

//celsius to farenheit

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
//when a user searches for a city  it should display the current temperature of the city.

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#tempCF");
  temperatureElement.innerHTML = `${temperature}°`;

  //temperature description
  let maxTemperature = Math.round(response.data.main.temp_max);
  let dailyMaxTemp = document.querySelector("#max-temperature");
  dailyMaxTemp.innerHTML = `High ${maxTemperature}°`;

  let minTemperature = Math.round(response.data.main.temp_min);
  let dailyMinTemp = document.querySelector("#min-temperature");
  dailyMinTemp.innerHTML = ` Low ${minTemperature}°`;

  //Feels like
  let feelsLike = Math.round(response.data.main.feels_like);
  let perception = document.querySelector("#feels-like");
  perception.innerHTML = `FEELS LIKE ${feelsLike}°`;

  //Humidity
  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `Humidity ${humidity}%`;

  //Wind Speed
  let windSpeed = Math.round(response.data.wind.speed);
  let showWindSpeed = document.querySelector("#wind-speed");
  showWindSpeed.innerHTML = ` Wind ${windSpeed}mph`;

  //icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function currentLocation(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#tempCF");
  temperatureElement.innerHTML = `${temperature}°F`;
}
//current location

function onCurrentCityClick() {
  console.log("Getting current location...");
  navigator.geolocation.getCurrentPosition(setCurrentCity);
}

function setCurrentCity(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "7a8fb47ff40cd23384da3446c5066c54";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  console.log("Querying weather API...");
  axios.get(apiURL).then(showTemperature);
}

let locationSearch = document.querySelector("#search-form");
locationSearch.addEventListener("submit", onSubmit);

let currentCity = document.querySelector("#current-location-button");
currentCity.addEventListener("click", onCurrentCityClick);
