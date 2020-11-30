import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	sendMessage: ['message'], // handle by saga // CODE FOR LIVE EXAMPLE
	receiveMessage: ['message'], // CODE FOR LIVE EXAMPLE
	renderPicacho: ['display'] // PICACHO EXAMPLE
});

export const ChatTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
	messageList: [], // CODE FOR LIVE EXAMPLE
	renderPicacho: false, // PICACHO EXAMPLE
});

/* ------------- Selectors ------------- */

export const ChatSelector = {
	messageList: state => state.chat.messageList, // CODE FOR LIVE EXAMPLE
	renderPicacho: state => state.chat.renderPicacho // PICACHO EXAMPLE
};

/* ------------- Reducers ------------- */

const initialStateReducer = () => {
	return INITIAL_STATE;
};

// CODE FOR LIVE EXAMPLE
const receiveMessageReducer = (state, action) => {
	const { message } = action;
	console.log(state.messageList);
	console.log(message);
	return state.merge({messageList: state.messageList.concat([message])});
};

// PICACHO EXAMPLE
const renderPicachoReducer = (state, action) => {
	const { display } = action;
	return state.merge({renderPicacho: display});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.RECEIVE_MESSAGE]: receiveMessageReducer, // CODE FOR LIVE EXAMPLE
	[Types.RENDER_PICACHO]: renderPicachoReducer // PICACHO EXAMPLE
});
