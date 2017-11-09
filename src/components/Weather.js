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
			weather: currentWeather,
			day0Weather: currentWeather,
			day1Weather: currentWeather,
			day2Weather: currentWeather,
			day3Weather: currentWeather,
			day4Weather: currentWeather
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
			const endpoint = 'https://api.openweathermap.org/data/2.5/forecast' + currentLocation + "&cnt=5" + fahrenheit + apiKey;
			requestURL = endpoint;
			console.log(endpoint);
			request.open('GET', endpoint);
			request.responseType = 'json';
			request.send();

			console.log("this state weather is " + referenceToThis.state.weather);
			request.onload = function (event) {
				var response = request.response;
				referenceToThis.setState({ weather: response });
				console.log("this state weather is " + JSON.stringify(referenceToThis.state.weather));
				let arrayLink = referenceToThis.state.weather.list;
				referenceToThis.setState({ day0Weather: arrayLink[0] });
				console.log("day0Weather is " + referenceToThis.state.day0Weather)
				console.log("day0Weather icon is " + referenceToThis.state.day0Weather.weather[0].icon)
				referenceToThis.setState({ day1Weather: arrayLink[1]  });
				referenceToThis.setState({ day2Weather: arrayLink[2]  });
				referenceToThis.setState({ day3Weather: arrayLink[3]  });
				referenceToThis.setState({ day4Weather: arrayLink[4]  });
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
		console.log(this.state.day0Weather)
		return (
			<div className="container">
			<header className='Weather-Header'>
					<button className='WeatherExitButton' onClick={this.props.closeHandler}>X</button>
					<h1 className='Weather-Title-Text'>Weather</h1>
				</header>
				<div className="Weather-Body">
				<CurrentWeather cityName={this.state.weather.name}
					icon={this.state.day0Weather.weather[0].icon}
					temp={Math.floor(this.state.day0Weather.main.temp)}
					desc={this.state.day0Weather.weather[0].description}
					tempMin={Math.floor(this.state.day0Weather.main.temp_min)}
					tempMax={Math.floor(this.state.day0Weather.main.temp_max)} />
				<Forecast />
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