let express = require('express');
let router = express.Router();

// Require controllers
let {
	getBooks,
	getBook,
	postBook,
	updateBook,
	deleteBook
} = require('../controllers/book');

// Routing logic
router.get('/', getBooks);
router.get('/:id', getBook);

router.post('/', postBook);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

module.exports = router;