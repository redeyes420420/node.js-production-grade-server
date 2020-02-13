process.env['NODE_ENV'] = 'test';

let Book = require('../models/book');
let app = require('../app');
let request = require('supertest');
let expect = require('chai').expect;

describe('Testing book api', () => {
	describe('Get /books', () => {
		it('Expected to return an empty array', done => {
			request(app)
				.get('/books')
				.set('accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					expect(res.body.data).to.be.an('array');
					expect(res.body.data).to.have.lengthOf(0);
					expect(err).to.be.a('null')
					done();
				});
		});
	});
	describe('Get /books/:id', () => {
		it('Expected to return null', done => {
			request(app)
				.get('/books/5c0a7922c9d89830f4911426')
				.set('accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					expect(res.body.data).to.be.a('null');
					expect(err).to.be.a('null')
					done();
				});
		});
	});
	describe('Post /books/', () => {
		it('Expected to return the same', done => {
			let body = {
				title: 'something',
				author: 'author',
				year: 2000,
				pages: 100
			}
			request(app)
				.post('/books')
				.send(body)
				.set('accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					expect(res.body.data).to.deep.include(body);
					expect(err).to.be.a('null')
					done();
				});
		});
	});
});