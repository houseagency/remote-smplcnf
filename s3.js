const Promise = require('bluebird');
const aws = require('aws-sdk');
aws.config.setPromisesDependency(Promise);

const s3 = new aws.S3({
	apiVersion: '2006-03-01',
	signatureVersion: 'v4'
});
module.exports = s3;
