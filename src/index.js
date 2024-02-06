function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"} />`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}: ${minutes}`;
}

function searchCity(city) {
  let apiKey = "1b524a706tf6eae1f36e8097foa05f9c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Wed", "Thurs", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="container">
   <div class="row-1">
    <div class="col-2">
     <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
                  width="45px"
                />

         <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temp-max">18°C</span>
          <span class="weather-forecast-temp-min">12°C</span>
     </div>
    </div>
  </div> 
</div>
  `;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Port Louis");
displayForecast();
