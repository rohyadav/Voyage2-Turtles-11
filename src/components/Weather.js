import React from 'react';
import '../styles/Weather.css';
import { CurrentWeather } from './CurrentWeather.js';
import { Forecast } from './Forecast.js';

let currentWeather = {
	"coord": { "lon": 145.77, "lat": -16.92 },
	"weather": [{ "id": 0, "main": "-", "description": "-", "icon": "-" }],
	"base": "-",
	"main": { "temp": 0, "pressure": 0, "humidity": 0, "temp_min": 0, "temp_max": 0 },
	"wind": { "speed": 0, "deg": 0 },
	"clouds": { "all": 0 },
	"rain": { "3h": 0 },
	"dt": 0,
	"sys": { "type": 0, "id": 0, "message": 0, "country": "-", "sunrise": 0, "sunset": 0 },
	"id": 0,
	"name": "-",
	"cod": 200,
	"city": {
		"name": "Sherman Oaks"
	}
};
let forecastWeather = {
	"dt": 1510340400,
	"temp": {
		"day": 60.85,
		"min": 40.6,
		"max": 67.84,
		"night": 45.45,
		"eve": 65.53,
		"morn": 40.6
	},
	"pressure": 962.64,
	"humidity": 69,
	"weather": [
		{
			"id": 500,
			"main": "Rain",
			"description": "light rain",
			"icon": "10d"
		}
	],
	"speed": 1.99,
	"deg": 158,
	"clouds": 20
}

export class Weather extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			weather: currentWeather,
			day0Weather: currentWeather,
			day1Weather: forecastWeather,
			day2Weather: forecastWeather,
			day3Weather: forecastWeather,
			day4Weather: forecastWeather,
			searchButton: '../assets/search.png',
			currentLocation: ""
		};
	};


	getCurrentWeather = () => {
		let referenceToThis = this;
		function success(position) {
			const request = new XMLHttpRequest();
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;
			let currentLocation = '?lat=' + latitude + '&lon=' + longitude;
			if (referenceToThis.state.currentLocation === "" ) {
				referenceToThis.setState({ currentLocation: currentLocation });
			}
			let fahrenheit = '&units=imperial';

			const apiKey = '&APPID=bdce9fa01aeef8c8db196211af9d7fb6';
			const endpoint = 'https://api.openweathermap.org/data/2.5/forecast/daily' + referenceToThis.state.currentLocation + "&cnt=5" + fahrenheit + "&APPID=55a55f3a05bdb182e76908ff3b938523";
			console.log("endpoint is " + endpoint);
			request.open('GET', endpoint);
			request.responseType = 'json';
			request.send();

			// console.log("this state weather is " + referenceToThis.state.weather);
			request.onload = function (event) {
				var response = request.response;
				referenceToThis.setState({ weather: response });
				// console.log("this state weather is " + JSON.stringify(referenceToThis.state.weather));
				let arrayLink = referenceToThis.state.weather.list;
				referenceToThis.setState({ day1Weather: arrayLink[1] });
				// console.log("day1Weather is " + JSON.stringify(referenceToThis.state.day1Weather));
				referenceToThis.setState({ day2Weather: arrayLink[2] });
				referenceToThis.setState({ day3Weather: arrayLink[3] });
				referenceToThis.setState({ day4Weather: arrayLink[4] });
			}

			const request2 = new XMLHttpRequest();
			const currentWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather' + referenceToThis.state.currentLocation + fahrenheit + apiKey;
			console.log("currentWeatherEndpoint is " + request2);
			request2.open('GET', currentWeatherEndpoint);
			request2.responseType = 'json';
			request2.send();
			request2.onload = function (event) {
				var currentWeatherResponse = request2.response;
				referenceToThis.setState({ day0Weather: currentWeatherResponse });
				// console.log("this state day0Weather is " + JSON.stringify(referenceToThis.state.day0Weather));
			}
		}

		function error() {
			console.log('getCurrentWeather() failed!');
		}

		navigator.geolocation.getCurrentPosition(success, error);
	}

	handleWeatherSearch = () => {
		let thisThis = this;
		let input = document.getElementById("searchTextInput").value;
		let newLocation = "";
		let searchButton = "";
		let inputIsANumber = Number.isInteger(Number.parseInt(input));
		if (input.length !== 0) {
			if (inputIsANumber) {
				newLocation = "?zip=" + input;
			} else {
				newLocation = "?q=" + input;
			}
			searchButton = '../assets/search – 2.png';
		} else {
			searchButton = '../assets/search.png';
		}
		thisThis.setState({ 
			currentLocation: newLocation, 
			searchButton: searchButton 
		});
		console.log(thisThis.state.currentLocation);
		return this.getCurrentWeather;
	}

	requestGeolocation() {
		if ('geolocation' in navigator) {
			console.log('geolocation present');
			this.getCurrentWeather();
		} else {
			console.log('geolocation not present');
		}
	}

	componentDidMount() {
		this.requestGeolocation();
	}

	dateGrabber(dt) {
		let d = new Date(dt * 1000);
		let splitD = d.toDateString().split(" ");
		let Day = splitD[0];
		return Day;
	}

	render() {
		// console.log('Weather tab opened');
		// console.log(this.state.day0Weather)
		return (
			<div className="container">
				<header className='Weather-Header'>
					<button className='WeatherExitButton' onClick={this.props.closeHandler}>X</button>
					<h1 className='Weather-Title-Text'>Weather</h1>
				</header>
				<div className="Weather-Body">
					{/* SEARCH FEATURE */}
					<div class="weathersSearchBackground">
						{/* <textarea onChange={this.setSearchQuery} className='SearchBox SearchBoxText' required placeholder="Search Something" /> */}
						<input id="searchTextInput" type="text" placeholder="Show the Weather in..." className='SearchBox SearchBoxText' />
						<a><img className='searchBookmarksButton' onClick={this.handleWeatherSearch} src={this.state.searchButton} alt="search"></img></a>
					</div>
					<div className="weatherCards">
						<CurrentWeather cityName={this.state.weather.city.name + ", " + this.state.weather.city.country}
							icon={this.state.day0Weather.weather[0].icon}
							temp={Math.floor(this.state.day0Weather.main.temp)}
							desc={this.state.day0Weather.weather[0].description}
							tempMin={Math.floor(this.state.day0Weather.main.temp_min)}
							tempMax={Math.floor(this.state.day0Weather.main.temp_max)} />
						<Forecast
							day1Min={Math.floor(this.state.day1Weather.temp.min)}
							day1Max={Math.floor(this.state.day1Weather.temp.max)}
							day1icon={this.state.day1Weather.weather[0].icon}
							day1Day={this.dateGrabber(this.state.day1Weather.dt)}

							day2Min={Math.floor(this.state.day2Weather.temp.min)}
							day2Max={Math.floor(this.state.day2Weather.temp.max)}
							day2icon={this.state.day2Weather.weather[0].icon}
							day2Day={this.dateGrabber(this.state.day2Weather.dt)}

							day3Min={Math.floor(this.state.day3Weather.temp.min)}
							day3Max={Math.floor(this.state.day3Weather.temp.max)}
							day3icon={this.state.day3Weather.weather[0].icon}
							day3Day={this.dateGrabber(this.state.day3Weather.dt)}

							day4Min={Math.floor(this.state.day4Weather.temp.min)}
							day4Max={Math.floor(this.state.day4Weather.temp.max)}
							day4icon={this.state.day4Weather.weather[0].icon}
							day4Day={this.dateGrabber(this.state.day4Weather.dt)}
						/>
					</div>
				</div>
			</div>
		);
	};
}

export class Empty extends React.Component {
	render() {
		console.log('Weather tab closed');
		return (
			<div></div>
		);
	}
}