import React, { Component } from 'react';
import '../styles/Weather.css';
import { Col, Row, Grid } from 'react-bootstrap';

export class Forecast extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		console.log('Forecast loaded');
		return (
			<div>
				{/* Forecast */}
				<div className="forecast container-fluid">
					<Grid>
						<Row className="show-grid">
							<Col xs={3}>
							</Col>

							<Col xs={3}>
								<p>Min</p>
							</Col>

							<Col xs={3}>
								<p>Max</p>
							</Col>

							<Col xs={3}>
								<p>Humidity</p>
							</Col>
						</Row>
						<Row className="show-grid">
							<Col xs={3}>
							</Col>

							<Col xs={3}>
								<p>Min</p>
							</Col>

							<Col xs={3}>
								<p>Max</p>
							</Col>

							<Col xs={3}>
								<p>Humidity</p>
							</Col>
						</Row>
					</Grid>
				</div>
			</div>
		);
	};
}