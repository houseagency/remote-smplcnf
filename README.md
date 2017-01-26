# smplcnf-http

Promised JSON config reader with http(s) support.

This module is a simple wrapper around
[smplcnf](https://github.com/spurge/smplcnf), adding a `http_load(url)`
function.

## How to use it

See [smplcnf](https://github.com/spurge/smplcnf) for non-http usage.

	const simple_config = require('smplcnf-http');
	const config = simple_config();

	config.load('local-defaults.conf');
	config.http_load('http://s3.amazonaws.com/mybucket/myconfig.json');

	config('my_config_key', 'default_value')
	.then(value => {
		// Yay!
	});


