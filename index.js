// let city = "London";
let units = "metric";
let loading = true;

const APIKey = "6d620f2b53f2149adda966b7314a7f09";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const iconBaseURL = "http://openweathermap.org/img/wn/";

const cardContainer = document.querySelector(".card-container");
const input = document.getElementById("loc-input");
const submit = document.getElementById("loc-submit");
const toggleUnits = document.getElementById("switch-units");

const weatherArr = [];

const getWeather = async (city) => {
  try {
    loading = true;
    renderCards();
    const response = await fetch(
      `${baseURL}${city}&units=${units}&appid=${APIKey}`
    );
    const json = await response.json();
    const weatherObj = {
      name: json.name,
      temp: json.main.temp,
      weather: json.weather[0].description,
      cloud: json.clouds.all,
      icon: json.weather[0].icon,
      loading: false,
    };
    weatherArr.push(weatherObj);
    loading = false;
    renderCards();
    return weatherObj;
  } catch (e) {
    loading = false;
    console.log(e);
  }
};

const renderCards = () => {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.lastChild);
  }
  if (loading) {
    cardContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="loader">Loading...</div>`
    );
  } else {
    weatherArr.forEach((card) => {
      cardContainer.insertAdjacentHTML(
        "beforeend",
        `    
        <div class="weather-card">
        <div class="weather-container">
          <p>
            <strong><span id="location">${card.name}</span></strong>
          </p>
          <p><span id="weather">${
            card.weather.charAt(0).toUpperCase() + card.weather.slice(1)
          }</span></p>
          <p><span id="temperature">${
            card.temp + (units === "metric" ? "°C" : "°F")
          }</span></p>
          <p><span id="cloud">${card.cloud}</span>% cloud cover</p>
          <img src="${iconBaseURL + card.icon + "@2x.png"}" id="icon" />
        </div>
      </div>
    `
      );
    });
  }
};

const applyEventListeners = () => {
  input.addEventListener("submit", submitWeather);
  submit.addEventListener("click", submitWeather);
  toggleUnits.addEventListener("click", function () {
    units === "metric" ? (units = "imperial") : (units = "metric");
    renderCards();
  });
};

const submitWeather = (event) => {
  event.preventDefault();
  getWeather(input.value);
};

getWeather("London");
applyEventListeners();

// updateInfo();
