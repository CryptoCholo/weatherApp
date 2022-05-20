import * as apiFncs from './apiCall.js';
import { getIcon } from './renderIcon.js';

//Current weather Elements
let weather = {};
const button = document.querySelector('.search-button');
const weatherDescription = document.querySelector('.weather-info_description');
const cityName = document.querySelector('.weather-info_city');
const dDate = document.querySelector('.weather-info_date');
const temp = document.querySelector('.weather-info_units-c');
const iconDiv = document.querySelector('.weather-info_icon');
const feelsLike = document.querySelector('#feels-like');
const humidity = document.querySelector('#humidity');
const chanceOfRain = document.querySelector('#chance-of-rain');
const windSpeed = document.querySelector('#wind-speed');

//Forecast weather Elementts
const forecastDiv = document.querySelector('.forecast');




button.addEventListener('click',  renderDom);

async function renderDom() {
   await renderCurrentWeather();
   await renderForecast();
}

async function renderCurrentWeather() {
    let result = await apiFncs.getWeather();
    console.log(result);
    weatherDescription.textContent = result.weather[0].description.toUpperCase();  
    weather.cityName = result.name;
    cityName.textContent = weather.cityName;
    const todaysDate = new Date((result.dt + result.timezone) * 1000);
    dDate.textContent = todaysDate.toDateString();
    temp.innerText = `${Math.round(result.main.temp - 273.15)} °C`;
    iconDiv.innerHTML = getIcon(result)
    feelsLike.innerText = `${Math.round(result.main.feels_like - 273.15)} °C`;
    weather.humidity  = result.main.humidity;
    humidity.innerText = `${weather.humidity} %`;
    chanceOfRain.innerText =  `${result.clouds.all} %`;
    windSpeed.innerText = `${result.wind.speed} Km/h`;
}

async function renderForecast() {
    if (forecastDiv.children.length === 0) {
    const response = await apiFncs.getForecast();
    let response1 = response.daily.slice(1); 
    response1.forEach(element => {
        let dailyForecastDiv = document.createElement('div');
        dailyForecastDiv.classList.add('daily-forecast');
        let forecastDay = document.createElement('div');
        forecastDay.classList.add('daily-forecast_day');
       let aDate = new Date((element.dt + response.timezone_offset) * 1000);
       forecastDay.textContent = aDate.toDateString().slice(0, 3);
        let tempDiv = document.createElement('div');
        tempDiv.classList.add('daily-forecast_temperature');
        let dailyHigh = document.createElement('div');
        dailyHigh.classList.add('daily-forecast_temperature-high');
        dailyHigh.textContent = `${Math.round(element.temp.max - 273.15)} °C`;
        let dailyLow = document.createElement('div');
        dailyLow.classList.add('daily-forecast_temperature-low');
        dailyLow.textContent = `${Math.round(element.temp.min - 273.15)} °C`;
        tempDiv.appendChild(dailyHigh);
        tempDiv.appendChild(dailyLow);
        dailyForecastDiv.appendChild(forecastDay);
        dailyForecastDiv.appendChild(tempDiv);
        const svgDiv = document.createElement('div');
        svgDiv.classList.add('daily-forecast_icon');
        const icon = getIcon(element);
        svgDiv.innerHTML = icon;
        dailyForecastDiv.appendChild(svgDiv);
        forecastDiv.appendChild(dailyForecastDiv);
    });
    } else {
       forecastDiv.innerHTML = ' ';
        renderForecast();
    }
}


// export { default };
