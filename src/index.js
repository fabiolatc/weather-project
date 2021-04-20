//Challenge 1

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

//Challenge 2
function dynamicTemperature(response) {
  let dynamicTemperature = response.data.main.temp;
  dynamicTemperature = Number(dynamicTemperature);
let temperatureElement = document.querySelector("#temperature-shown");
temperatureElementFixed = Math.round(dynamicTemperature);

temperatureElement.innerHTML = `${temperatureElementFixed}°C`

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

let form = document.querySelector("#search-city");
form.addEventListener("submit", showCity)

