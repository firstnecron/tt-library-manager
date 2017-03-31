'use strict';

const express = require('express');

const Loan = require('../db/models').Loan;
const Book = require('../db/models').Book;
const Patron = require('../db/models').Patron;

function routes() {
	const router = new express.Router();
	router.route('/')
		.post((req, res) => { // eslint-disable-line
			// Add new loan
		})
		.get((req, res) => {
			// Get all loans
			Loan.findAll({
				where: {active: true},
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
