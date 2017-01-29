# remote-smplcnf

[![Build Status](https://semaphoreci.com/api/v1/houseagency/remote-smplcnf/branches/master/shields_badge.svg)](https://semaphoreci.com/houseagency/remote-smplcnf)

Promised JSON config reader with support for loading configurations from remote
(http and aws s3).

This module is a simple wrapper around
[smplcnf](https://github.com/spurge/smplcnf), adding a `remote_load(url)`
function.

## How to use it

See [smplcnf](https://github.com/spurge/smplcnf) for non-http usage.

Example:

	const simple_config = require('remote-smplcnf');
	const config = simple_config();

	config.load('local-defaults.conf');
	config.remote_load('http://example.org/mybucket/myconfig.json');
	config.remote_load('s3://bucket/theconfig.json');

	config('my_config_key', 'default_value')
	.then(value => {
		// Yay!
	});

## The `.remote_load(url)` function

If the `url` has the format `"s3://<bucket>/<key>"`, the AWS-SDK will be used
for fetching the configuration.

Otherwise, axios will be used for making an HTTP GET request to the URL.
If used in a web browser, the `url` can be relative.

## AWS S3 credentials

### Alternative 1: Running on Amazon EC2

If your IAM roles are properly set up, your EC2 instance will have access to
the S3 bucket out of the box! (No hassle with credentials, etc.)

### Alternative 2: `~/.aws/credentials`

You can store your AWS credentials in `~/.aws/credentials` in this format:

	[default]
	aws_access_key_id = YOUR_ACCESS_KEY_ID
	aws_secret_access_key = YOUR_SECRET_ACCESS_KEY

### Alternative 3: Provide credentials as environment variables:

Use those environment variables to set your credentials:

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY

### Alternative 4: Make your bucket public

There are probably situations when you don't want this.

## Tests

Unit tests and integration tests are in the same file.
Unit tests are prefixed (or wrapped) with "Unit:" and integrations tests are
prefixeda (or wrapped) with "Integration:" in the `description()`.

### Unit tests

Run the unit tests:

	npm test

### Integration tests

Requires docker-compose version 1.10.0 or later, and docker (only tested with
docker version 1.12.1).

Run the interation tests:

	npm run integrationtests

#### AWS credentials for integration tests

Pass your AWS credentials to the integration tests containers using environment
variables:

	AWS_ACCESS_KEY_ID=XXX AWS_SECRET_ACCESS_KEY=XXX npm run integrationtests

