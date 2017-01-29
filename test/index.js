const axios = require('axios');
const expect = require('chai').expect;
const Promise = require('bluebird');
const td = require('testdouble');
const remote_smplcnf = require('../index');
const s3 = require('../s3');

describe('Unit:', () => {
	describe('remote-smplcnf', () => {

		const exampleUrl = 'http://example.org/config.json';
		const exampleConfig = {
			testing: "this is a test"
		};

		const exampleS3Bucket = 'examplebucket';
		const exampleS3Key = 'config.json';
		const exampleS3Url = 's3://' + exampleS3Bucket + '/' + exampleS3Key;
		const exampleS3Config = {
			testing: "this is an aws s3 test"
		};

		before(() => {
			axios.get = td.function();
			td.when(axios.get(exampleUrl))
			.thenResolve({ data: exampleConfig });

			s3.getObject = td.function()
			td.when(s3.getObject({ Bucket: exampleS3Bucket, Key: exampleS3Key}))
			.thenReturn({
				promise: () => Promise.try(() => {
					return { Body: new Buffer(JSON.stringify(exampleS3Config)) };
				})
			});
		});

		it('instances has a remote_load() function', () => {
			let config = remote_smplcnf();
			expect(config.remote_load).to.be.a('function');
		});

		it('instances has the functions from smplcnf', () => {
			let config = remote_smplcnf();
			expect(config.clear).to.be.a('function');
			expect(config.load).to.be.a('function');
			expect(config.set).to.be.a('function');
		});

		it('calls axios.get() on remote_load() and sets config from result', () => {
			let config = remote_smplcnf();
			return config.remote_load(exampleUrl)
			.then(() => {
				return config('testing')
				.then(testing => {
					expect(testing).to.equal(exampleConfig.testing);
				});
			});
		});

		it('loads from S3 on remote_load(), and sets config from result', () => {
			let config = remote_smplcnf();
			return config.remote_load(exampleS3Url)
			.then(() => {
				return config('testing')
				.then(testing => {
					expect(testing).to.equal(exampleS3Config.testing);
				});
			});
		});

	});
});

describe('Integration:', () => {

	it('loads configuration from remote HTTP server', () => {
		let config = remote_smplcnf();
		return config.remote_load('http://webserver/config.json')
		.then(() => {
			return config('names')
			.then(names => {
				expect(names.zlatan).to.equal('ibrahimovic');
				expect(names.ronaldo).to.equal('nazário de lima');
				expect(names.eric).to.equal('cantona');
			});
		});
	});

	it('loads configuration using aws s3 api', () => {
		let config = remote_smplcnf();
		return config.remote_load('s3://houseagency/integration_tests/remote-smplcnf/config.json')
		.then(() => {
			return config('seagulls')
			.then(seagulls => {
				expect(seagulls).to.equal('follow the trawler');
				return config('sardines');
			})
			.then(sardines => {
				expect(sardines).to.equal('thrown in the sea');
			});
		});
	}).timeout(5000);

});

