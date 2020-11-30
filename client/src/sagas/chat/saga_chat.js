import {put} from 'redux-saga/effects';
import requests from '../../base/api/requests'; // CODE FOR LIVE EXAMPLE
import ChatActions, {ChatTypes} from '../../redux/chat'; // CODE FOR LIVE EXAMPLE

// CODE FOR LIVE EXAMPLE
export function* sendMessage(api, action) {

	try {
		const {message} = action;

		// display the sent message to me
		yield put(ChatActions.receiveMessage(message));

		// send the message to them
		message.author = 'them';
		requests.broadcastAction( {type: ChatTypes.RECEIVE_MESSAGE, message});

		// PICACHO EXAMPLE
		if (message.data.text && message.data.text.toUpperCase().includes('PIKACHU')) {
			requests.broadcastAction({type: ChatTypes.RENDER_PICACHO, display: true});
			setTimeout(() => {
				requests.broadcastAction({type: ChatTypes.RENDER_PICACHO, display: false});
			}, 3000);
		}
	} catch (e) {
		console.log(e);
	}

}
