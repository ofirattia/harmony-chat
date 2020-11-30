import "@babel/polyfill";


import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import jsdom from 'jsdom';
import chai, {expect} from 'chai';
import chaiJquery from 'chai-jquery';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from '../src/redux';
import rootSaga from '../src/sagas';

import ConnectedIntlProvider from '../src/base/features/base-i18n/IntlProvider';
import {
	HashRouter,
	Route,
	BrowserRouter as Router
} from 'react-router-dom';
import Enzyme, {mount, shallow} from 'enzyme';
import {MemoryRouter} from 'react-router';
import createSagaMiddleware from 'redux-saga';

global.document = jsdom.jsdom('<!doctype html><html><body><div id="root"></div></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
import {globalActionListener} from '../src/base/features/base-store';
import {globalStoreListener, STORE_ACTION_LISTENERS} from '../src/base/features/base-services';

const $ = _$(window);

chaiJquery(chai, chai.util, $);

/** DEFINE STORE */
const sagaMiddleware = createSagaMiddleware();
/* -------- create the store with middleware ---------- */
const createStoreWithMiddleware = applyMiddleware(
	sagaMiddleware,
	globalActionListener
)(createStore);

const store = createStoreWithMiddleware(reducers);
/* -------- run sagas ---------- */
sagaMiddleware.run(rootSaga);

/* -------- actions listener ---------- */
globalStoreListener.subscribe(STORE_ACTION_LISTENERS, (data) => {
	console.log(data);
})

/* -------- helpers ---------- */
function getWrapper(ComponentClass, props = {}, state = {}) {
	const wrapper = mount(
		<Provider store={createStore(reducers, {})}>
			<ConnectedIntlProvider>
				<ComponentClass/>
			</ConnectedIntlProvider>
		</Provider>
	);
	return wrapper;
}

function getRouteWrapper(ComponentClass, props = {}, state = {}) {
	const wrapper = mount(
		<Provider store={store}>
			<ConnectedIntlProvider>
				<MemoryRouter initialEntries={['/']}>
					<ComponentClass/>
				</MemoryRouter>
			</ConnectedIntlProvider>
		</Provider>
	);
	return wrapper;
}

$.fn.simulate = function (eventName, value) {
	if (value) {
		this.val(value);
	}
	TestUtils.Simulate[eventName](this[0]);
};

export {globalStoreListener, getRouteWrapper, getWrapper, expect, $};
