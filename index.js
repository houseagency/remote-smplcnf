const axios = require('axios');
const Promise = require('bluebird');
const s3 = require('./s3');
const smplcnf = require('smplcnf');

function wrapper() {
	const conf = smplcnf();

	conf.remote_load = function(url) {
		return Promise.try(() => {
			let s3parts;
			if (s3parts = /^s3:\/\/([^\/]+)\/(.*)$/.exec(url)) {
				return s3.getObject({
					Bucket: s3parts[1],
					Key: s3parts[2]
				}).promise()
				.then(response => {
					return response.Body.toString();
				});
			} else {
				return axios.get(url)
				.then(response => {
					return response.data;
				});
			}
		})
		.then(data => {
			if (typeof data === 'string') {
				return JSON.parse(data);
			}
			return data;
		})
		.then(conf.set);
	}

	return conf;
}

module.exports = wrapper;
