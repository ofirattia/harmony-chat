import React from 'react';
import {Component} from 'react';

export default class App extends Component {
	render() {
		return (
			<div>
				<div className="sample-header">
					<div className="sample-header-section">
						<h2>Broadcasting Actions</h2>
						<h3>Write less, do more.</h3>
					</div>
				</div>
				{this.props.children}
			</div>
		);
	}
}
