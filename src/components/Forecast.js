import React from 'react';
import '../styles/Weather.css';
import { Col, Row, Grid } from 'react-bootstrap';
import { WeatherIcon } from './WeatherIcon.js'
export class Forecast extends React.Component {
	render() {
		// console.log('Forecast loaded');
		return (
			<div className="container-fluid" >
				<Grid>
					<Row>
						<Col xs={3}>
							<h3 className="day">{this.props.day1Day}</h3>
						</Col>
						<Col xs={3}>
							<h3 className="day">{this.props.day2Day}</h3>
						</Col>
						<Col xs={3}>
							<h3 className="day">{this.props.day3Day}</h3>
						</Col>
						<Col xs={3}>
							<h3 className="day">{this.props.day4Day}</h3>
						</Col>
					</Row>
					<Row>
						<Col xs={3}>
							<h4 className="minMaxTemp">{this.props.day1Max}°  |   {this.props.day1Min}°</h4>
						</Col>
						<Col xs={3}>
							<h4 className="minMaxTemp">{this.props.day2Max}°  |   {this.props.day2Min}°</h4>
						</Col>
						<Col xs={3}>
							<h4 className="minMaxTemp">{this.props.day3Max}°  |   {this.props.day3Min}°</h4>
						</Col>
						<Col xs={3}>
							<h4 className="minMaxTemp">{this.props.day4Max}°  |   {this.props.day4Min}°</h4>
						</Col>
					</Row>
					<Row>
						<Col xs={3}>
							<img className="forecastWeatherImage" src={WeatherIcon(this.props.day1icon)} alt="" />
						</Col>
						<Col xs={3}>
							<img className="forecastWeatherImage" src={WeatherIcon(this.props.day2icon)} alt="" />
						</Col>
						<Col xs={3}>
							<img className="forecastWeatherImage" src={WeatherIcon(this.props.day3icon)} alt="" />
						</Col>
						<Col xs={3}>
							<img className="forecastWeatherImage" src={WeatherIcon(this.props.day4icon)} alt="" />
						</Col>
					</Row>
				</Grid>
			</div >
		);
	};
}