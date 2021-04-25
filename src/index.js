let now = new Date();
let timeSpace = document.querySelector("#la-hora");

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
    "December"
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let year = now.getYear() + 1900;
  let date = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  

  let displayToday = `${hour}h${minutes} ${day} | ${month} ${date}th ${year}`;
  return displayToday;

}

timeSpace.innerHTML = formatDate();

function dynamicTemperature(response) {
  celciusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature-shown");
  celciusTemperature = Number(celciusTemperature);
  
  let windSpeed = response.data.wind.speed
  let windElement = document.querySelector("#wind-list")
  
  let dynamicHumidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity-list");
  let dynamicDescription = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");

temperatureElementFixed = Math.round(celciusTemperature);
temperatureElement.innerHTML = `${temperatureElementFixed}`
windElement.innerHTML = `${windSpeed} km/h`
humidityElement.innerHTML = `${dynamicHumidity}%`
descriptionElement.innerHTML = dynamicDescription;
}

function showCity(event) {
  event.preventDefault();
  let result = document.querySelector("#searched-city");
  let dynamicCity = document.querySelector("#city");
  dynamicCity.innerHTML = result.value;
  let apiKey = "3c7e72471b038017abb118fddfa1d953";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${result.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(dynamicTemperature)
}

function changeToFarh(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-shown");
  let fahrenheitTemperature = (celciusTemperature * 9 ) / 5 + 32;
  let fahrenheitTempFixed = Math.round(fahrenheitTemperature);
  temperatureElement.innerHTML = `${fahrenheitTempFixed}`
}

function showCelciusAgain(event) {event.preventDefault();
let temperatureElement = document.querySelector("#temperature-shown");
temperatureElement.innerHTML = Math.round(celciusTemperature);}


let celciusTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", showCity)

let farhLink = document.querySelector("#farh")
farhLink.addEventListener("click", changeToFarh);

let celciusLink = document.querySelector("#celcius")
celciusLink.addEventListener("click", showCelciusAgain)
