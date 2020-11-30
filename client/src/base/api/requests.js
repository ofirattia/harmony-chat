import axios from 'axios';
import {config} from '../../config';

class Request {

	constructor() {
		if (typeof (sessionStorage) !== 'undefined') {
			let user = JSON.parse(sessionStorage.getItem('user'));
			let AUTH_TOKEN = user ? user.Authorization : null;

			this.setCommonHeader('Authorization', AUTH_TOKEN);
		}
	}

	setCommonHeader(key, value) {
		axios.defaults.headers.common[key] = value;
	}

	broadcastAction(action) {

		if (!action) return;

		const callConfig = {
			method: 'post',
			baseURL: config.ROOT_SERVRE_URL,
			url: '/users/broadcastAction',
			data: {
				action: action,
				token: typeof (sessionStorage) !== 'undefined' ? sessionStorage.getItem('wsa_token') : {}
			}
		};

		return this.call(callConfig);

	}

	async call(config) {
		return new Promise(async (resolve, reject) => {

			let response = {};

			try {
				response = await axios(config);
				response.error = false;

				resolve(response);

			} catch (e) {
				response = e.response || {};
				response.error = true;

				reject(response);

			}

		});
	}

}

let request = new Request();

export default request;


