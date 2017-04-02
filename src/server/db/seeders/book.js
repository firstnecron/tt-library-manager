'use strict';

module.exports = {
	up(queryInterface/* , Sequelize */) {
		/**
		 * Add altering commands here.
		 * Return a promise to correctly handle asynchronicity.
		 *
		 * Example:
		 * return queryInterface.bulkInsert('Person', [{
		 * name: 'John Doe',
		 * isBetaMember: false
		 * }], {});
		 */
		return queryInterface.bulkInsert('Book', [
			/* eslint-disable camelcase */
			{
				title: 'Harry Potter and the Philosopher\'s Stone',
				author: 'J.K. Rowling',
				genre: 'Fantasy',
				first_published: 1997,
				active: true
			},
			{
				title: 'Harry Potter and the Chamber of Secrets',
				author: 'J.K. Rowling',
				genre: 'Fantasy',
				first_published: 1998,
				active: true
			},
			{
				title: 'Harry Potter and the Prisoner of Azkaban',
				author: 'J.K. Rowling',
				genre: 'Fantasy',
				first_published: 1999,
				active: true
			},
			{
				title: 'Harry Potter and the Goblet of Fire',
				author: 'J.K. Rowling',
				genre: 'Fantasy',
				first_published: 2000,
				active: true
			},
			{
				title: 'Harry Potter and the Order of the Phoenix',
				author: 'J.K. Rowling',
				genre: 'Fantasy',
				first_published: 2003,
				active: true
			},
			{
				title: 'Harry Potter and the Half-Blood Prince',
				author: 'J.K. Rowling',
				genre: 'Fantasy',
				first_published: 2005,
				active: true
			},
			{
				title: 'Harry Potter and the Deathly Hallows',
				author: 'J.K. Rowling',
				genre: 'Fantasy',
				first_published: 2007,
				active: true
			},
			{
				title: 'A Brief History of Time',
				author: 'Stephen Hawking',
				genre: 'Non Fiction',
				first_published: 1988,
				active: true
			},
			{
				title: 'The Universe in a Nutshell',
				author: 'Stephen Hawking',
				genre: 'Non Fiction',
				first_published: 2001,
				active: true
			},
			{
				title: 'Frankenstein',
				author: 'Mary Shelley',
				genre: 'Horror',
				first_published: 1818,
				active: true
			},
			{
				title: 'The Martian',
				author: 'Andy Weir',
				genre: 'Science Fiction',
				first_published: 2014,
				active: true
			},
			{
				title: 'Ready Player One',
				author: 'Ernest Cline',
				genre: 'Science Fiction',
				first_published: 2011,
				active: true
			},
			{
				title: 'Armada',
				author: 'Ernest Cline',
				genre: 'Science Fiction',
				first_published: 2015,
				active: true
			},
			{
				title: 'Pride and Prejudice',
				author: 'Jane Austen',
				genre: 'Classic',
				first_published: 1813,
				active: true
			},
			{
				title: 'Emma',
				author: 'Jane Austen',
				genre: 'Classic',
				first_published: 1815,
				active: true
			},
			{
				title: 'An inactive (deleted) book',
				author: 'Some Author',
				genre: 'None',
				first_published: 2050,
				active: false
			}
			/* eslint-enable camelcase */
		], {});
	},

	down(queryInterface/* , Sequelize */) {
		/**
		 * Add reverting commands here.
		 * Return a promise to correctly handle asynchronicity.
		 *
		 * Example:
		 * return queryInterface.bulkDelete('Person', null, {});
		 */
		return queryInterface.bulkDelete('Book', null, {});
	}
};
