import {connect} from 'react-redux';
import {addLocaleData, IntlProvider} from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import enLocaleData from 'react-intl/locale-data/en';

addLocaleData([...frLocaleData]);
addLocaleData([...enLocaleData]);

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.
function mapStateToProps(state) {
	const locale = state.i18n.locale;
	const m = typeof(state.i18n.messages) == 'object' && typeof(state.i18n.messages.get) == 'undefined' ? state.i18n.messages : state.i18n.messages.toJS();
	return {defaultLocale: locale, locale: locale, messages: m};
}

export default connect(mapStateToProps)(IntlProvider);
