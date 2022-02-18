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

//Feature 2: when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

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

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//when a user searches for a city  it should display the current temperature of the city.

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#tempCF");
  temperatureElement.innerHTML = `${temperature} °  `;

  //temperature description
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let maxTemperature = Math.round(response.data.main.temp_max);
  let dailyMaxTemp = document.querySelector("#max-temperature");
  dailyMaxTemp.innerHTML = ` Hi ${maxTemperature} ° `;

  let minTemperature = Math.round(response.data.main.temp_min);
  let dailyMinTemp = document.querySelector("#min-temperature");
  dailyMinTemp.innerHTML = ` Low ${minTemperature} ° `;

  //Feels like
  let feelsLike = Math.round(response.data.main.feels_like);
  let perception = document.querySelector("#feels-like");
  perception.innerHTML = `FEELS LIKE ${feelsLike}`;

  //Humidity
  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}%`;

  //Wind Speed
  let windSpeed = Math.round(response.data.wind.speed);
  let showWindSpeed = document.querySelector("#wind-speed");
  showWindSpeed.innerHTML = `${windSpeed}mph`;

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

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
