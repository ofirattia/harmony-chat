const getParameterByName = (name, url) => {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/\[\[\]]/g, '\\$&');
	let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const getQueryParams = (url) => {
	if (typeof url == 'undefined') {
		url = window.location.search.length > 0 ? window.location.search : window.location.hash;
	}
	url = url.split('#')[1]; // Discard fragment identifier.
	let urlParams = {};
	let queryString = url.split('?')[1];
	if (!queryString) {
		if (url.search('=') !== false) {
			queryString = url;
		}
	}
	if (queryString) {
		let keyValuePairs = queryString.split('&');
		for (let i = 0; i < keyValuePairs.length; i++) {
			let keyValuePair = keyValuePairs[i].split('=');
			let paramName = keyValuePair[0];
			let paramValue = keyValuePair[1] || '';
			urlParams[paramName] = decodeURIComponent(paramValue.replace(/\+/g, ' '));
		}
	}
	return urlParams;
};

const redirectUrl = (url) =>{
	window.location.href = url;
};

export {
	getParameterByName,
	getQueryParams,
	redirectUrl
};