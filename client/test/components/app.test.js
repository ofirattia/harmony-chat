import {expect, $, getWrapper, getRouteWrapper} from '../test_helper';
import App from '../../src/components/app';
import Localization from '../../src/containers/localization/Localization';
import Login from '../../src/containers/user/Login';
import Register from '../../src/containers/user/Register';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {mount, shallow} from 'enzyme';
import PostsIndex from '../../src/containers/posts/PostsIndex';

Enzyme.configure({adapter: new Adapter()});

import React from 'react';


describe('App defined', function () {


	it('Localization has local class', () => {
		let wrapper = getWrapper(Localization);
		expect(wrapper.find('div').hasClass("locale")).to.be.true;
	});
	it('Should App Contains Localization', () => {
		let wrapper = getRouteWrapper(App);
		expect(wrapper.find(PostsIndex)).to.have.length(0);
		expect(wrapper.find(Localization)).to.have.length(1);
	});
	it('Should Register Fail - Empty Fields', () => {
		let wrapper = getRouteWrapper(Register);
		wrapper.find('form').simulate('submit');
		expect(wrapper.find('.error-label').at(0)).to.have.length(1);
	});
	it('Should Register Fail - Password Confirmation', () => {
		let wrapper = getRouteWrapper(Register);
		const emailInput = wrapper.find('input[name="email"]').first();
		const passInput = wrapper.find('input[name="password"]').first();
		const confirmPassInput = wrapper.find('input[name="repassword"]').first();
		const submitButton = wrapper.find('button').first();
		const errorPasswordConfirm = wrapper.find('.error-label').at(2);
		const form = wrapper.find('form').first();
		emailInput.simulate('change', {target: {value: 'john.doe@gmail.com'}});
		passInput.simulate('change', {target: {value: 'o1'}});
		confirmPassInput.simulate('change', {target: {value: 'o3'}});
		form.simulate('submit');
		let errorLength = errorPasswordConfirm.text().length;
		expect(errorLength).to.greaterThan(1);
	});
	it('Should Register - Passed', () => {
		let wrapper = getRouteWrapper(Register);
		const emailInput = wrapper.find('input[name="email"]').first();
		const passInput = wrapper.find('input[name="password"]').first();
		const confirmPassInput = wrapper.find('input[name="repassword"]').first();
		const submitButton = wrapper.find('button').first();
		const errorPasswordConfirm = wrapper.find('.error-label').at(2);
		const form = wrapper.find('form').first();
		emailInput.simulate('change', {target: {value: 'john@gmail.com'}});
		passInput.simulate('change', {target: {value: '1'}});
		confirmPassInput.simulate('change', {target: {value: '1'}});
		form.simulate('submit');
		let errorLength = errorPasswordConfirm.text().length;
		expect(errorLength).to.equal(0);
	});
});
