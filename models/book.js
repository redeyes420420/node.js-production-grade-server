let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		required: true,
	},
	pages: {
		type: Number,
		min: 1,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('book', BookSchema);