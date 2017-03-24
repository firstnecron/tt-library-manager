'use strict';

const express = require('express');

const Patron = require('../db/models').Patron;

function routes() {
	const router = new express.Router();
	router.route('/')
		.post((req, res) => { // eslint-disable-line
			// Add new patron
		})
		.get((req, res) => {
			// Get all patrons
			Patron.findAll()
				.then(patrons => {
					res.json(patrons);
				})
				.catch(error => {
					res.status(500).json(error);
				});
		});
	return router;
}

module.exports = routes();
