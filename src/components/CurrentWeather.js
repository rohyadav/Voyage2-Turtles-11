import React from 'react';
import '../styles/Weather.css';
import { WeatherIcon } from './WeatherIcon.js';
import { Col, Row, Grid } from 'react-bootstrap';
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
				<br />
				<center><img className="mainWeatherImage" src={iconID} alt="" /></center>
				<center><h4>{this.props.cityName}</h4></center>
				<h5>{this.props.desc}</h5>

				{/* <h1>{this.props.temp + "°"}</h1>
				<p>Current Temp.</p>
				<div className="currentTempMinMax">
					<div className="currentMax">
						<h1>{this.props.tempMax}°F</h1>
						<p className="small">Max</p>
					</div>
					<div className="currentMin">
						<h1>{this.props.tempMin}°F</h1>
						<p className="small">Min</p>
					</div>
				</div> */}
				<div className="currentWeather container">
					<Grid>
						<Row className="forecastInfo">
							<Col xs={4}>
								<h1 className="currentMin">{this.props.tempMin}°F</h1>
								<p className="small">Min</p>
							</Col>
							<Col xs={4}>
								<h1 className="currentTemp">{this.props.temp + "°"}</h1>
							</Col>
							<Col xs={4}>
								<h1 className="currentMax">{this.props.tempMax}°F</h1>
								<p className="small">Max</p>
							</Col>
						</Row>
					</Grid>
				</div>
			</div>
		);
	};
}