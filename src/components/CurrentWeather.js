import React, { Component } from 'react';
import '../styles/Weather.css';

export class CurrentWeather extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		console.log('CurrentWeather loaded');
		return (
			<div class="container">
				{/* Current Weather */}
				<div class="currentWeather">
					<h1>{this.props.cityName}</h1>
					<h2>Image for Weather</h2>
					<h3>Temperature | Current Weather</h3>
					<h3>Day/Date</h3>
					<div class="currentTempMinMax">
						<div class="currentMin">
							<h3>Temp Min</h3>
						</div>
						<div class="currentMax">
							<h3>Temp Max</h3>
						</div>
					</div>
				</div>
			</div>
		);
	} ;
}