import React from 'react';
import '../styles/Weather.css';
import { CurrentWeather } from './CurrentWeather.js';
import { Forecast } from './Forecast.js';

let requestURL = '';

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
	"cod": 200
};

let weatherIndex = currentWeather.weather[0];

export class Weather extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			weather: currentWeather
		};
	};


	getCurrentWeather = () => {
		let referenceToThis = this;
		function success(position) {
			const request = new XMLHttpRequest();
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;
			let currentLocation = '?lat=' + latitude + '&lon=' + longitude;
			let fahrenheit = '&units=imperial';

			const apiKey = '&APPID=bdce9fa01aeef8c8db196211af9d7fb6';
			const endpoint = 'https://api.openweathermap.org/data/2.5/weather' + currentLocation + fahrenheit + apiKey;
			requestURL = endpoint;

			request.open('GET', endpoint);
			request.responseType = 'json';
			request.send();

			console.log("this state weather is " + referenceToThis.state.weather);

			request.onload = function (event) {
				var response = request.response;
				referenceToThis.setState({ weather: response });
				console.log("this state weather is " + JSON.stringify(referenceToThis.state.weather));
			}

		}

		function error() {
			console.log('getCurrentWeather() failed!');
		}

		navigator.geolocation.getCurrentPosition(success, error);
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

	render() {
		console.log('Weather tab opened');
		return (
			<div class="container">
				<CurrentWeather cityName={this.state.weather.name}
					icon={this.state.weather.icon}
					temp={this.state.weather.main.temp}
					desc={this.state.weather.weather[0].description}
					tempMin={this.state.weather.main.temp_min}
					tempMax={this.state.weather.main.temp_max} />
				<Forecast />
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