import React, {Component} from 'react';
import {Field} from 'redux-form';

export function createField(component, requiredProps) {

	class CreateField extends Component {
		render() {
			const input = this.props;

			return (
				<Field
					component={component}
					{...this.props}
					{...input}
				/>
			);
		}
	}

	CreateField.propTypes = requiredProps;

	return CreateField;
}
