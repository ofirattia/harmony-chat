import {takeLatest} from 'redux-saga/effects';
import createApi from '../requests';

/* ------------- Types ------------- */

import { ChatTypes } from '../redux/chat'; // CODE FOR LIVE EXAMPLE

/* ------------- Sagas ------------- */

import * as sagasChat from './chat/saga_chat'; // CODE FOR LIVE EXAMPLE


const innorlate = createApi();

export default function* () {
	yield [
		takeLatest(ChatTypes.SEND_MESSAGE, sagasChat.sendMessage, innorlate) // CODE FOR LIVE EXAMPLE
	];
}