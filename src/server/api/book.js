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
	return router;
}

module.exports = routes();
