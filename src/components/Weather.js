import React, { Component } from 'react';
import '../styles/Weather.css';
import { CurrentWeather } from './CurrentWeather.js';
import { Forecast } from './Forecast.js';

let requestURL = '';

let currentWeather = {"name": '-'};

export class Weather extends React.Component {
	constructor(props) {
		super(props);
	};

	getCurrentWeather() {
		console.log('getCurrentWeather running');

		function success(position) {
			console.log('getCurrentPosition(success) running');
			const request = new XMLHttpRequest();
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;
			let currentLocation = '?lat=' + latitude + '&lon=' + longitude;

			const apiKey = '&APPID=bdce9fa01aeef8c8db196211af9d7fb6';
			const endpoint = 'https://api.openweathermap.org/data/2.5/weather' + currentLocation + apiKey;
			requestURL = endpoint;
			console.log(requestURL);

			function sendRequest(url) {
				console.log('sending weather request');
				console.log(url);
				const request = new XMLHttpRequest();
				request.open('GET', url);
				request.responseType = 'json';
				request.send();
		
				request.onload = () => {
					console.log('running request.onload');
					currentWeather = request.response;
				}
			};

			sendRequest(requestURL);
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
				<CurrentWeather cityName={currentWeather.name} />
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