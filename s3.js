//
// This is it's own module, since we want the same s3 object in both code and
// tests, to be able to do mocking.
//

const aws = require('aws-sdk');
const s3 = new aws.S3();
module.export = s3;
