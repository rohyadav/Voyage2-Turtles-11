import React, { Component } from 'react';
import '../styles/Weather.css';
import { Col, Row, Grid } from 'react-bootstrap';
import { WeatherIcon } from './WeatherIcon.js'
export class Forecast extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		console.log('Forecast loaded');
		return (
			<div>
				{/* Forecast */}
				<div className="forecast container">
					<Grid>
						<Row className="forecastInfo">
							<Col xs={6}>
								<h3>{this.props.day1Day}</h3>
								<h4>{this.props.day1Max}°  |   {this.props.day1Min}°</h4>
							</Col>
							<Col xs={6}>
								<img className="forecastWeatherImage" src={WeatherIcon(this.props.day1icon)} alt="" />
							</Col>
						</Row>
					</Grid>
					<Grid>
						<Row className="forecastInfo">
							<Col xs={6}>
								<h3>{this.props.day2Day}</h3>
								<h4>{this.props.day2Max}°  |   {this.props.day2Min}°</h4>
							</Col>
							<Col xs={6}>
								<img className="forecastWeatherImage" src={WeatherIcon(this.props.day2icon)} alt="" />
							</Col>
						</Row>
					</Grid>
					<Grid>
						<Row className="forecastInfo">
							<Col xs={6}>
								<h3>{this.props.day3Day}</h3>
								<h4>{this.props.day3Max}°  |   {this.props.day3Min}°</h4>
							</Col>
							<Col xs={6}>
								<img className="forecastWeatherImage" src={WeatherIcon(this.props.day3icon)} alt="" />
							</Col>
						</Row>
					</Grid>
					<Grid>
						<Row className="forecastInfo">
							<Col xs={6}>
								<h3>{this.props.day4Day}</h3>
								<h4>{this.props.day4Max}°  |   {this.props.day4Min}°</h4>
							</Col>
							<Col xs={6}>
								<img className="forecastWeatherImage" src={WeatherIcon(this.props.day4icon)} alt="" />
							</Col>
						</Row>
					</Grid>
				</div>
			</div>
		);
	};
}