/* eslint-disable */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

const globalSpinner = function globalSpinner(binder, startCallback, stopCallback, interval) {
	window.loader_ajax_active = 0;
	window.loader_stop_checking = false;

	// to set by user
	window.loader_interval = interval ? interval : 1000;
	window.loader_binder = binder ? binder : this;
	window.loader_start_callback = startCallback ? startCallback : function (method, url, async, user, pass) {};
	window.loader_stop_callback = stopCallback ? stopCallback : function (method, url, async, user, pass) {};

	if (!Number.isInteger(window.loader_interval)) {
		console.error('globalLoader: interval must be a number!');
		return;
	}

	if (typeof window.loader_start_callback !== 'function') {
		console.error('globalLoader: startCallback must be an function!');
		return;
	}

	if (typeof window.loader_stop_callback !== 'function') {
		console.error('globalLoader: stopCallback must be an function!');
		return;
	}

	function startLoadingSpinner(method, url, async, user, pass) {
		setTimeout(function () {
			window.loader_start_callback.call(window.loader_binder, method, url, async, user, pass);
		}, 0);
	}

	function stopLoadingSpinner(method, url, async, user, pass) {
		if (loader_ajax_active === 0 && !window.loader_stop_checking) {
			window.loader_stop_checking = true;
			setTimeout(function () {
				if (loader_ajax_active === 0) {
					window.loader_stop_callback.call(window.loader_binder, method, url, async, user, pass);
				}
				window.loader_stop_checking = false;
			}, window.loader_interval);
		}
	}

	(function (open) {
		return XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
			this.addEventListener('readystatechange', function () {

				if (this.readyState == 1) {
					window.loader_ajax_active += 1;
					startLoadingSpinner(method, url, async, user, pass);
				} else if (this.readyState == 4) {
					window.loader_ajax_active -= 1;
					stopLoadingSpinner(method, url, async, user, pass);
				}
			}, false);
			return open.call(this, method, url, async, user, pass);
		};
	})(XMLHttpRequest.prototype.open);
};

exports.default = globalSpinner;
