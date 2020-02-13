exports.start = async () => {
	let { MongoMemoryServer } = require('mongodb-memory-server');

	let mongod = new MongoMemoryServer();
	let uri = await mongod.getUri();
	return uri;
}