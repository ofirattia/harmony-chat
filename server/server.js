// BASE SETUP
// =============================================================================

// call the packages we need
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import WebSocket from 'ws';
import browserSync from 'browser-sync';
import mongoose from 'mongoose';
import _ from 'lodash';
import routes from './src/routes';
import config from './src/config';

mongoose.Promise = require('bluebird');

// configure app
app.use(morgan('dev')); // log requests to the console

// apply headers
app.use((req, res, next) => {
	if (process.env.NODE_ENV == "development") {
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.header('Expires', '-1');
		res.header('Pragma', 'no-cache');
	}
	res.header('Access-Control-Allow-METHODS', 'GET,PUT,POST,DELETE,HEAD,OPTIONS');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', "X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, Origin, x-requested-with, Content-Type, Content-Range, Content-Disposition, Content-Description");
	next();
});

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
let port = 8080;
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
	port = 7000; // set our port
}

// WEBSOCKET SERVER

const wss = new WebSocket.Server({port: config.websocket.port});

wss.broadcastAction = (request) => {

	try {
    console.log("INCOMING REQUEST ACTION: ", request.action);
    console.log("VALIDATING ALLOWED ACTIONS: ", request.action.type);
		const result = _.find(config.allowedActions, (o) => {
			return o === request.action.type
		});

		if (!result) {
			return;
    }
    console.log("BROADCASTING REQUEST ACTION: ", request.action);
		wss.broadcast({
			"WS_ACTION": true,
			"token": request.token || null,
			"action": request.action
		});
	} catch (e) {
		console.log(e);
	}

};

wss.broadcast = (data) => {
	wss.clients.forEach((client) => {

		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(data));
		}
	});
};

wss.on('connection', (ws) => {
	console.log("new connection to websocket");

	ws.on('message', (data) => {
		console.log("incoming message: " + data);
	});
});

app.set('wss', wss);


// REGISTER OUR ROUTES -------------------------------
routes.default(app);

app.use(express.static(path.join(__dirname, '..', 'client')));
// API FALLBACK
app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, '..', '/client/index.html'));
});
app.set('etag', false);
// START THE SERVER
// =============================================================================
app.listen(port);

if (process.env.NODE_ENV === 'development') {
	var serverURL = "http://localhost:" + port;
	browserSync.create();
	browserSync.init({
		port: 8080,
		files: [
			path.join(__dirname, '..', 'client', 'dist')
		],
		proxy: serverURL,
		browser: "chrome",
		notify: false,
		online: false,
    logConnections: false,
    ghostMode: false
	});
}
console.log('Magic happens on port ' + port);

// uncaughtException
process.on('uncaughtException', (err) => {
	console.log(err);
})