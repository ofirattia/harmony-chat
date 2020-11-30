import React, {Component} from 'react';
import {baseConnect} from '../../base/features/base-redux-react-connect';
import {changeLocale} from '../../base/features/base-i18n/actions/actions_i18n';

class Localization extends Component {

	render() {
		return (
			<div className="locale" style={{width: '100%', padding: '10px', textAlign: 'center'}}>
				Language:
				<select onChange={this.onSelect.bind(this)}>
					<option value="en">en</option>
					<option value="fr">fr</option>
				</select>
			</div>
		);
	}

	onSelect(event) {
		this.props.changeLocale(event.target.value);
	}
}

export default baseConnect(Localization,
	(/* state */) => {
		return {};
	},
	{
		changeLocale: changeLocale
	}
);