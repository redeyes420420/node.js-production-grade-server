// Import crucial packages
let express = require('express');
let config = require('config');
let mongoose = require('mongoose');
let mockdb = require('./util/mock-mongodb');

// Import middlewares
let logger = require('./logger/logger');
let bodyParser = require('body-parser');
let cors = require('cors')

// Import routers
let bookRouter = require('./routes/book');

let app = express();
// So that we can set the server more elegantly
let isProd = app.get('env') == 'production';

// Apply some middlewares here
// Logger logic:
if (isProd) {
	app.use(logger.prod(config.logger.format));
} else {
	app.use(logger.dev(config.logger.format));
}

app.use(bodyParser.json());
app.use(cors());

// See in which mode you're working in
console.debug(app.get('env').toUpperCase());

// Mongodb connection
// CREATING MOCK MONGODB AND THEN CONNECT IF NODE_ENV == 'test'
if (app.get('env') == 'test') mockdb.start().then(uri => mongoose.connect(uri, config.db.options));
else mongoose.connect(config.db.uri, config.db.options);
mongoose.connection.on('connected', () => console.debug('Connected to DB at:', mongoose.connection.client.s.url));
mongoose.connection.on('error', (err) => console.error(err));

// unhandled errors
process.on('uncaughtException', err => {
	console.error(err);
	process.exit(1);
});
process.on('unhandledRejection', err => {
	console.error(err);
	process.exit(1);
});

// Register routers
app.use('/books', bookRouter);


// ERROR HANDLING HERE

// Catch 404 and forward it
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Dev error handler
if (!isProd) {
	app.use((err, req, res, next) => {
		console.debug(err);
		res.status(err.status || 500);
		res.send({
			errors: {
				message: err.message,
				error: err
			}
		});
	});
}

// Prod error handler
app.use((err, req, res, next) => {

	res.status(err.status || 500);
	res.send({
		errors: {
			message: err.message,
			error: {}
		}
	});
});

// Start up
app.listen(config.server.port, () => console.debug(`Starting on :${config.server.port}`));

// For Testing
module.exports = app;