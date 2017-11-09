import React from 'react';
import '../styles/Weather.css';
import { CurrentWeather } from './CurrentWeather.js';
import { Forecast } from './Forecast.js';

let requestURL = '';

let currentWeather = {"coord":{"lon":145.77,"lat":-16.92},
	"weather":[{"id":0,"main":"-","description":"-","icon":"-"}],
	"base":"-",
	"main":{"temp":0,"pressure":0,"humidity":0,"temp_min":0,"temp_max":0},
	"wind":{"speed":0,"deg":0},
	"clouds":{"all":0},
	"rain":{"3h":0},
	"dt":0,
	"sys":{"type":0,"id":0,"message":0,"country":"-","sunrise":0,"sunset":0},
	"id":0,
	"name":"-",
	"cod":200};

let weatherIndex = currentWeather.weather[0];

export class Weather extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			weather: currentWeather
		};

		// this.updateWeather = this.updateWeather.bind(this);
		// this.getCurrentWeather = this.getCurrentWeather.bind(this);
		// this.sendRequest = this.sendRequest.bind(this);
		// this.success = this.success.bind(this);
	};

	newWeather(data) {
		this.setState({ weather: data });
	}

	getCurrentWeather = () => {

		function success(position) {
			const request = new XMLHttpRequest();
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;
			let currentLocation = '?lat=' + latitude + '&lon=' + longitude;
			let fahrenheit = '&units=imperial';

			const apiKey = '&APPID=bdce9fa01aeef8c8db196211af9d7fb6';
			const endpoint = 'https://api.openweathermap.org/data/2.5/weather' + currentLocation + fahrenheit + apiKey;
			requestURL = endpoint;
			// sendRequest(requestURL);

			request.open('GET', endpoint);
			request.responseType = 'json';
			request.send();
			request.onload(this.newWeather(request.response));
				// this.newWeather(request.response);
			

			// function sendRequest(url) {
			// 	// console.log('sending weather request');
			// 	// console.log(url);
			// 	const request = new XMLHttpRequest();
			// 	request.open('GET', url);
			// 	request.responseType = 'json';
			// 	request.send();

			// 	request.onload = () => {
			// 		console.log('running request.onload');
			// 		currentWeather = request.response;
			// 		this.forceUpdate();
					// console.log(newWeather);
					// this.setState = ({ weather: newWeather });
					// console.log(this.state.weather);
				// }
			// }
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
				icon={weatherIndex.icon}
				temp={currentWeather.main.temp}
				desc={currentWeather.weather[0].description}
				tempMin={currentWeather.main.temp_min}
				tempMax={currentWeather.main.temp_max} />
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