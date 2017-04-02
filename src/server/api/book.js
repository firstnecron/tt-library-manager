'use strict';

const express = require('express');
const sequelize = require('sequelize'); // eslint-disable-line

const Book = require('../db/models').Book;

const Loan = require('../db/models').Loan;
const Patron = require('../db/models').Patron;

function routes() {
	const router = new express.Router();
	router.route('/')
		.post((req, res) => {
			// Add new book
			if (req.body.active === undefined) {
				req.body.active = true;
			}

			Book.create(req.body)
				.then(() => {
					res.send('Added new book');
				})
				.catch(error => {
					res.status(500).json(error);
				});
		})
		.get((req, res) => {
			// Get all books
			Book.findAll({where: {active: true}})
				.then(books => {
					res.json(books);
				})
				.catch(error => {
					res.status(500).json(error);
				});
		});

	// Get all available books (none with loans)
	router.route('/available')
		.get((req, res) => {
			Book.findAll({
				where: {
					active: true
				},
				include: [{
					model: Loan,
					required: false,
					where: {active: true}
				}]
			})
				.then(books => {
					books = books.filter(book => {
						return !book.Loans || book.Loans.length === 0;
					});
					res.json(books);
				})
				.catch(error => {
					res.status(500).json(error);
				});
		});

	/**
	 * Middleware for single book
	 * Used for get, put, and remove
	 * Retrieves 1 book and attatches to req object
	 */
	router.use('/:bookId', (req, res, next) => {
		Book.findById(req.params.bookId)
			.then(book => {
				if (book) {
					req.book = book;
					return next();
				}
				return res.status(404).send('No book found.');
			})
			.catch(error => {
				res.status(500).json(error);
			});
	});

	router.route('/:bookId')
		.get((req, res) => {
			res.json(req.book);
		})
		.put((req, res) => {
			req.book.update(req.body)
				.then(book => {
					res.json(book);
				})
				.catch(error => {
					res.status(500).json(error);
				});
		})
		.delete((req, res) => {
			req.book.update({active: false})
				.then(() => {
					res.status(204).send('Book removed');
				})
				.catch(error => {
					res.status(500).json(error);
				});
		});

	router.route('/:bookId/loans')
		.get((req, res) => {
			Loan.findAll({
				where: {
					book_id: req.params.bookId, // eslint-disable-line camelcase
					active: true
				},
				include: [
					{model: Book},
					{model: Patron}
				]
			})
				.then(loans => {
					res.json(loans);
				})
				.catch(error => {
					res.status(500).json(error);
				});
		});

	return router;
}

module.exports = routes();
