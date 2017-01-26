const axios = require('axios');
const smplcnf = require('smplcnf');

function wrapper() {
	const conf = smplcnf();

	conf.http_load = function(url) {
		return axios.get(url)
		.then(conf.set);
	}

	return conf;
}

module.exports = wrapper;
