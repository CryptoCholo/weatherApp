const city = document.querySelector('.city');
const  errorMsg = document.querySelector('.error-msg');


export async function getWeather() {
    try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=3&appid=b7bf1c050cc42a94a80578dfdc3a6118`, {mode: 'cors'});
    const cordinates = await response.json();
    const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cordinates[0].lat}&lon=${cordinates[0].lon}&appid=b7bf1c050cc42a94a80578dfdc3a6118`, {mode: 'cors'});
    const result1 = await currentWeather.json();
    return result1;
    } catch(e) {
        errorMsg.innerText = e;
    }
}

export async function getForecast() {
    try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=3&appid=b7bf1c050cc42a94a80578dfdc3a6118`, {mode: 'cors'});
    const cordinates = await response.json();
    const weatherForecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cordinates[0].lat}&lon=${cordinates[0].lon}&appid=b7bf1c050cc42a94a80578dfdc3a6118`, {mode: 'cors'});
   const result2 = await weatherForecast.json();
   return result2;
    } catch(e) {
        return
    }
}