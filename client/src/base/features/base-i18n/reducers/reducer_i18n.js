import Immutable from 'seamless-immutable';
import ActionTypes from '../actions';
import appMessages from '../../base-i18n';

const defaultLocale = 'en';

const INITIAL_STATE = Immutable({
	locale: defaultLocale,
	messages: appMessages[defaultLocale],
	appMessages: appMessages,
});

export default function (state = INITIAL_STATE, action) {

	switch (action.type) {

	case ActionTypes.CHANGE_LOCALE:
		return state.set('locale', action.payload).set('messages', appMessages[action.payload]);

	default:
		return state;

	}
}
