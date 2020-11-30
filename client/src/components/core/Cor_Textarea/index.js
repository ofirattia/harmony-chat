import React from 'react';
import PropTypes from 'prop-types';
import {createField} from '../../../base/features/base-redux-form-field';

const component = ({meta: {touched, error, invalid}, input, label, T}) => {

	return (
		<div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
			<label>{label}</label>
			<div>
				<textarea {...input} placeholder={label} className="form-control"/>
				<div style={{color: '#d9534f'}}>{touched && T(error)}</div>
			</div>
		</div>
	);

};

export default createField(component, {
	label: PropTypes.string.isRequired,
	T: PropTypes.func.isRequired
});


