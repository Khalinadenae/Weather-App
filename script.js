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

//feature : API integration 5 day forecast
function showForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "Hello";
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
  <table class="table table-sm ">
<table class="table table-hover">
  <tbody>
    <tr>
      <th scope="row no-gutters"> </th>
      <div class="forecast-temp">  <td> <span class="max">68°</span>/60° <span class="min"></span></td>  </div>
      <div class="forecast-date">   <td> ${day} </td> </div>
 <div class="temp-description"> <td>Sunny </td>  </div>
    </tr>
  </tr>
  `;
  });

  forecastElement.innerHTML = forecastHTML;
}

//Feature 2: when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

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

showForecast();
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
}

function currentLocation(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#tempCF");
  temperatureElement.innerHTML = `${temperature}°F`;
}
