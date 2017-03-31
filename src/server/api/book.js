'use strict';

const express = require('express');

const Book = require('../db/models').Book;

function routes() {
	const router = new express.Router();
	router.route('/')
		.post((req, res) => { // eslint-disable-line
			// Add new book
		})
		.get((req, res) => {
			// Get all books
			Book.findAll()
				.then(books => {
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

	return router;
}

module.exports = routes();
