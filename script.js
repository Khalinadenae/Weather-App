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
      <th scope="col">${formatDay(forecastDay.dt)}</th>
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
  let unit = "imperial";
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
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//when a user searches for a city  it should display the current temperature of the city.

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  // city
  let heading = document.querySelector("#city");
  heading.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#tempCF");
  temperatureElement.innerHTML = `${temperature}° F `;

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

//current location

let currentLocationClick = document.querySelector("#current-location-button");
currentLocationClick.addEventListener("click", retrievePosition);

function retrievePosition(event) {
  navigator.geolocation.getCurrentPosition(getLocation);
  function getLocation(position) {
    console.log(position);

    let apiKey = "7a8fb47ff40cd23384da3446c5066c54";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let unit = "imperial";

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(url).then(showTemperature);
  }
}
