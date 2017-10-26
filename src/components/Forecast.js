import React, { Component } from 'react';
import '../styles/Weather.css';

export class Forecast extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		console.log('Forecast loaded');
		return (
			<div>
				{/* Forecast */}
				<div class="forecast">
				</div>
			</div>
		);
	} ;
}