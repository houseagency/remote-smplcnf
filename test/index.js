const axios = require('axios');
const expect = require('chai').expect;
const td = require('testdouble');
const smplcnf_http = require('../index');

describe('smplcnf-http', () => {

	const exampleUrl = 'http://example.org/config.json';
	const exampleConfig = {
		testing: "this is a test"
	};

	before(() => {
		axios.get = td.function();
		td.when(axios.get(exampleUrl))
		.thenResolve(exampleConfig);

	});

	it('instances has a http_load() function', () => {
		let config = smplcnf_http();
		expect(config.http_load).to.be.a('function');
	});

	it('instances has the functions from smplcnf', () => {
		let config = smplcnf_http();
		expect(config.clear).to.be.a('function');
		expect(config.load).to.be.a('function');
		expect(config.set).to.be.a('function');
	});

	it('calls axios.get() on http_load() and sets config from result', () => {
		let config = smplcnf_http();
		return config.http_load(exampleUrl)
		.then(() => {
			return config('testing')
			.then(testing => {
				expect(testing).to.equal(exampleConfig.testing);
			});
		});
	});

});
