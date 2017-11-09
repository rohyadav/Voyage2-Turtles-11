import React from 'react';
import '../styles/Weather.css';

export class CurrentWeather extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.desc)
	};

	render() {
		console.log('CurrentWeather loaded');
		let iconID = "http://openweathermap.org/img/w/10d.png";
		// let currentDescription = {this.props.desc};
		console.log(iconID)
		console.log(this.props.tempMin)

		return (
			<div className="container">
				{/* Current Weather */}
				<div className="currentWeather">
					<h3 className="left">{this.props.cityName}</h3>
					<img src={iconID} alt="" />
					<h3>{this.props.temp} | {this.props.desc}</h3>
					<h3>Day/Date</h3>
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
			</div>
		);
	};
}