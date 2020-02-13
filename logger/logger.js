let morgan = require('morgan');
let fs = require('fs');
let path = require('path');

exports.dev = (format) => {
	let stream = process.stdout;
	return morgan(format, {
		stream: stream
	});
}

exports.prod = (format) => {
	let filename = path.join(__dirname, '..', 'logs', `from-${new Date().toISOString()}.log`);
	let stream = fs.createWriteStream(filename);
	return morgan(format, {
		stream: stream,
		skip: (req, res) => res.statusCode < 400
	});
}