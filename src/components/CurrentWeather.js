import React from 'react';
import '../styles/Weather.css';
import {WeatherIcon} from './WeatherIcon.js'
export class CurrentWeather extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.desc)
	};

	render() {
		console.log('CurrentWeather loaded');
		let iconID = WeatherIcon(this.props.icon);
		// let currentDescription = {this.props.desc};
		console.log(iconID)
		console.log(this.props.tempMin)

		return (
			<div className="currentWeather">
				{/* Current Weather */}
				<center><h4>{this.props.cityName}</h4></center>
				<center><img className="mainWeatherImage" src={iconID} alt="" /></center>
				<h4>{this.props.desc}</h4>
				<h1>{this.props.temp + "°"}</h1>
				<p>Current Temp.</p>
				<div className="currentTempMinMax">
					<div className="currentMin">
						<h1>{this.props.tempMin}°F</h1>
						<p className="small">Min</p>
					</div>
					<div className="currentMax">
						<h1>{this.props.tempMax}°F</h1>
						<p className="small">Max</p>
					</div>
				</div>
			</div>
		);
	};
}