import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {reduxForm} from 'redux-form';
import translator from '../../utils/translator';

export function baseConnect(component, mapStateToProps, propsToDispatch) {
	return connect(mapStateToProps, propsToDispatch)(
		injectIntl(translator(component)));
}

export function baseConnectForm(component, mapStateToProps, propsToDispatch, formConfig) {
	return connectWithReduxForm(translator(component), mapStateToProps,
		propsToDispatch, formConfig);
}

function connectWithReduxForm(component, mapStateToProps, mapDispatchToProps, reduxFormConfig) {

	reduxFormConfig.validate = component.prototype.validate ||
		function (/* values */) {
		};

	let wrappedComponent = connect(mapStateToProps, mapDispatchToProps)(
		injectIntl(reduxForm(reduxFormConfig)(component)));

	return wrappedComponent;
}

