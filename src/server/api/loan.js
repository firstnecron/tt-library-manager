'use strict';

const express = require('express');

const Loan = require('../db/models').Loan;

function routes() {
	const router = new express.Router();
	router.route('/')
		.post((req, res) => { // eslint-disable-line
			// Add new loan
		})
		.get((req, res) => {
			// Get all loans
			Loan.findAll({where: {active: true}})
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
