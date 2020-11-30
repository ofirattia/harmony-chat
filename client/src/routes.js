import React from 'react';
import {
	Route
} from 'react-router-dom';

/* -------------- Components --------------- */
import App from './components/app';
import PortalIndex from './containers/portal/PortalIndex';

/* -------------- Routes Paths --------------- */
export const ROOT = '/';


export default (

	<App>
		<Route exact path={ROOT} component={PortalIndex}/>
	</App>

);



