import React from 'react';
import '../styles/Weather.css';
import { WeatherIcon } from './WeatherIcon.js';
import { Col, Row, Grid } from 'react-bootstrap';
export class CurrentWeather extends React.Component {
	render() {
		// console.log('CurrentWeather loaded');
		let iconID = WeatherIcon(this.props.icon);
		// let currentDescription = {this.props.desc};
		// console.log(iconID)
		// console.log(this.props.tempMin)

		return (
			<div>
				{/* Current Weather */}
				<div className="container-fluid">
					<Grid>
						<Row>
							<Col xs={8}>
								<center><h4 className="weatherCityName">{this.props.cityName}</h4></center>
								<h5 className="weatherDescription">{this.props.desc}</h5>
							</Col>
							<Col xs={4}>
								<h1 className="currentMin">{this.props.tempMin}°F ~ {this.props.tempMax}°F</h1>
							</Col>
						</Row>
						<Row className="currentWeatherIconAndTemp">
							<Col xs={6}>
								<center><img className="mainWeatherImage" src={iconID} alt="" /></center>
							</Col>
							<Col xs={6}>
								<h1 className="currentTemp">{this.props.temp + "°F"}</h1>
							</Col>
						</Row>
					</Grid>
				</div>
			</div>
		);
	};
}