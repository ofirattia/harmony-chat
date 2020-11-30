import { ChatTypes } from '../../client/src/redux/chat';

const config = {
	JWT_SECRET: "OFIRISTHEBEST",
	server: {
		port: process.env.PORT || 8080
	},
	websocket: {
		port: process.env.WS_PORT || 3030
	},

	allowedActions: [
		ChatTypes.RECEIVE_MESSAGE, // CODE FOR LIVE EXAMPLE
		ChatTypes.RENDER_PICACHO // PICACHO EXAMPLE
	]


};

module.exports = config;