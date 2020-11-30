function initConfig() {

	let config = {};
	if (process.env.NODE_ENV === 'development') {

		/* ---------- Config Development --------- */
		config = {
			ROOT_SERVRE_URL: 'http://localhost:8080/api',
			ROOT_WS_URL: 'ws://localhost:3030',
			isMock: false
		};

	} else if (process.env.NODE_ENV === 'production') {

		/* ---------- Config Production --------- */
		config = {
			ROOT_SERVRE_URL: 'http://localhost:8080/api',
			ROOT_WS_URL: 'ws://localhost:3030',
			isMock: false
		};

	}

	return config;

}

export const config = initConfig();

