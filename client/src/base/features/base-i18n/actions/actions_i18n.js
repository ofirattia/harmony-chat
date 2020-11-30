import ActionTypes from '../actions';

export function changeLocale(locale) {
	return {
		type: ActionTypes.CHANGE_LOCALE,
		payload: locale,
	};
}
