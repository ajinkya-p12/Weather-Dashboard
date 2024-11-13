// API Keys for weather API

const API_KEY2 = "4e814a0b8ac601188ef5f6cd1b98d59e";

API_KEY = '22dac4725d084fdd96a51010242306';

// Recording inputs from the HTML page

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');

const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const condition = document.getElementById('current-condition');

// Calling API to retrieve weather information

async function getData(cityInput){
	const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=22dac4725d084fdd96a51010242306&q=${cityInput}&aqi=yes`);
	return await promise.json();
}

searchBtn.addEventListener('click',async ()=>{
	const input = cityInput.value;
	const result = await getData(input);
	cityName.innerText = `${result.location.name}, ${result.location.localtime}`;
	temperature.innerText = `Temperature: ${result.current.heatindex_c}°C`;
	windSpeed.innerText = `Wind: ${result.current.wind_kph} Km/h`;
	humidity.innerText = `Humidity: ${result.current.humidity}%`;
	condition.innerText = result.current.condition.text;
})

// Obtaining Geolocation Coordinates of the user:

async function getUserCoordinates(){
	navigator.geolocation.getCurrentPosition(
		position => {
			const {latitude, longitude} = position.coords;
			const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=4e814a0b8ac601188ef5f6cd1b98d59e`;
			fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
				const city = data[0].name;
				myCity(city);
			})
		}, error => {
			if(error.code === error.PERMISSION_DENIED){
				alert("Geolocation request denied. Please reset location permission to grant access again.");
			}
		}
	)
}
async function myCity(city){
	const result = await getData(city);
	cityName.innerText = `${result.location.name}, ${result.location.localtime}`;
	temperature.innerText = `Temperature: ${result.current.heatindex_c}°C`;
	windSpeed.innerText = `Wind: ${result.current.wind_kph} Km/h`;
	humidity.innerText = `Humidity: ${result.current.humidity}%`;
	condition.innerText = result.current.condition.text;
}

locationBtn.addEventListener('click',getUserCoordinates)

// Displaying weather data for sample cities

printData(`London`);
printData(`Paris`);
printData(`Tokyo`);
printData(`Washington`);
printData(`Dubai`);

async function printData(city){
	const result1 = await getData(city);
    const temperature1 = document.querySelector(`#${city} #temperature1`);
	const windSpeed1 = document.querySelector(`#${city} #windSpeed1`);
	const humidity1 = document.querySelector(`#${city} #humidity1`);
	temperature1.innerText = `Temperature: ${result1.current.heatindex_c}°C`;
	windSpeed1.innerText = `Wind: ${result1.current.wind_kph} Km/h`;
	humidity1.innerText = `Humidity: ${result1.current.humidity}%`;
}
