let now = new Date();
let timeSpace = document.querySelector("#la-hora");
let apiKey = "3c7e72471b038017abb118fddfa1d953";

function formatDate() {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

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
  
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  

  let displayToday = `${hour}h${minutes} ${day} | ${month} ${date}th ${year}`;
  return displayToday;

}

function displayForecast(response) {
  console.log(response)
  forecastHTML = `<div class="row">`;
let days = ["Thur", "Fri","Sat","Sun"];
days.forEach(function(day){forecastHTML = forecastHTML + `
<div class="col-3">
    <div class="forecast-day">
            <img src="http://openweathermap.org/img/wn/02n@2x.png" width="30"> </i> <br>${day}<br> 30ºC
        </div></div> `;
      }
      )


forecastHTML = forecastHTML + `</div>`;

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML
}

timeSpace.innerHTML = formatDate();

function dynamicForecast(coordinates) {
 console.log(coordinates)
 let lat = coordinates.lat;
 let lon = coordinates.lon;
let forecasturl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`;
axios.get(forecasturl).then(displayForecast);
}

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
  let iconElement = document.querySelector("#icon");
  let iconId = response.data.weather[0].icon;
  

  temperatureElementFixed = Math.round(celciusTemperature);
temperatureElement.innerHTML = `${temperatureElementFixed}`
windElement.innerHTML = `${windSpeed} km/h`
humidityElement.innerHTML = `${dynamicHumidity}%`
descriptionElement.innerHTML = dynamicDescription;
iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${iconId}@2x.png`);
dynamicForecast(response.data.coord);

}

function showCity(event) {
  event.preventDefault();
  let result = document.querySelector("#searched-city");
  let dynamicCity = document.querySelector("#city");
  dynamicCity.innerHTML = result.value;
  
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${result.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(dynamicTemperature);
 
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

function search(city) {

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dynamicTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", showCity)

let farhLink = document.querySelector("#farh")
farhLink.addEventListener("click", changeToFarh);

let celciusLink = document.querySelector("#celcius")
celciusLink.addEventListener("click", showCelciusAgain)

search("Guayaquil")