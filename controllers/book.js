let Book = require('../models/book');

// VERY CAREFUL!
// THE SYSTEM DOES NOT VALIDATE DATA BEFORE
// SENDING IT TO THE DB. NOT SITUATED FOR
// PRODUCTION.

exports.getBooks = async (req, res, next) => {
	try {
		let books = await Book.find({});
		res.send({
			data: books
		});
	} catch(ex) {
		next(ex);
	}
}

exports.getBook = async (req, res, next) => {
	try {
		let book = await Book.findById(req.params.id);
		res.send({
			data: book
		})
	} catch (ex) {
		next(ex);
	}
}

exports.postBook = async (req, res, next) => {
	try {
		let newBook = new Book(req.body);
		await newBook.save();
		res.send({
			data: newBook
		});
	} catch (ex) {
		next(ex);
	}
}

exports.updateBook = async (req, res, next) => {
	try {
		let body = req.body;
		let result = await Book.findByIdAndUpdate(req.params.id, {
			$set: body
		}, { new: true });
		res.send({
			data: result
		});
	} catch (ex) {
		next(ex);
	}
}

exports.deleteBook = async (req, res, next) => {
	try {
		let result = await Book.findByIdAndRemove(req.params.id);
		res.send({
			data: result
		});
	} catch (ex) {
		next(ex);
	}
}