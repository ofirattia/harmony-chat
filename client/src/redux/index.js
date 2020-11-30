import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import i18n from '../base/features/base-i18n/reducers/reducer_i18n';

const rootReducer = combineReducers({
	chat: require('./chat').reducer,

	i18n: i18n,
	form: form,
});

export default rootReducer;
