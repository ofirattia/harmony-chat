const wsReconnectClient = require('ws-reconnect-js');
const guid = require('guid');

class WSActions {

	constructor(store, url, options) {
		this.store = store;
		this.url = url;
		this._socket = new wsReconnectClient(url, options, {
			onMessageHandler: this.onMessage.bind(this)
		});

	}

	onMessage(msg, data) {

		try {
			const wsa_token = sessionStorage.getItem('wsa_token');
			const dispatchAction = JSON.parse(data);
			const me = (wsa_token && dispatchAction.token === sessionStorage.getItem('wsa_token'));

			if (dispatchAction.WS_ACTION && dispatchAction.action && !me) {
				this.store.dispatch(dispatchAction.action);
			}
		} catch (e) {
			if (process.env.NODE_ENV === 'development') {
				// eslint-disable-next-line no-console
				console.error('dispatchAction faild: ', e);
			}
		}
	}

	start() {
		sessionStorage.setItem('wsa_token', guid.create());
		this._socket.start();
	}

	stop() {
		sessionStorage.removeItem('wsa_token');
		this._socket.destroy();
	}


}

export default WSActions;