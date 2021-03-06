'use strict';

const express = require('express');

const Patron = require('../db/models').Patron;

const Loan = require('../db/models').Loan;
const Book = require('../db/models').Book;

function routes() {
	const router = new express.Router();
	router.route('/')
		.post((req, res) => {
			// Add new patron
			if (req.body.active === undefined) {
				req.body.active = true;
			}

			Patron.create(req.body)
				.then(() => {
					res.send('Added new patron');
				})
				.catch(error => {
					res.status(500).json(error);
				});
		})
		.get((req, res) => {
			// Get all patrons
			Patron.findAll({where: {active: true}})
				.then(patrons => {
					res.json(patrons);
				})
				.catch(error => {
					res.status(500).json(error);
				});
		});

	/**
	 * Middleware for single patron
	 * Used for get, put, and remove
	 * Retrieves 1 patron and attatches to req object
	 */
	router.use('/:patronId', (req, res, next) => {
		Patron.findById(req.params.patronId)
			.then(patron => {
				if (patron) {
					req.patron = patron;
					return next();
				}
				return res.status(404).send('No patron found.');
			})
			.catch(error => {
				res.status(500).json(error);
			});
	});

	router.route('/:patronId')
		.get((req, res) => {
			res.json(req.patron);
		})
		.put((req, res) => {
			req.patron.update(req.body)
				.then(patron => {
					res.json(patron);
				})
				.catch(error => {
					res.status(500).json(error);
				});
		})
		.delete((req, res) => {
			req.patron.update({active: false})
				.then(() => {
					res.status(204).send('Patron removed');
				})
				.catch(error => {
					res.status(500).json(error);
				});
		});

	router.route('/:patronId/loans')
		.get((req, res) => {
			Loan.findAll({
				where: {
					patron_id: req.params.patronId, // eslint-disable-line camelcase
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
