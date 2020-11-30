import React, {Component} from 'react';
import {baseConnect} from '../../base/features/base-redux-react-connect';
import Chat from '../chat';

class PortalIndex extends Component {

	render() {
		return (
			<div>
				<Chat />
			</div>
		);
	}
}

export default baseConnect(PortalIndex,
	(state) => {
		return {
			
		};
	},
	{
	}
);