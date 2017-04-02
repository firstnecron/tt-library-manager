'use strict';

module.exports = {
	up(queryInterface/* , Sequelize */) {
		/**
		 * Add altering commands here.
		 * Return a promise to correctly handle asynchronicity.
		 *
		 * Example:
		 * return queryInterface.bulkInsert('Person', [{
		 * book_id: 'John Doe',
		 * isBetaMember: false
		 * }], {});
		 */
		return queryInterface.bulkInsert('Loan', [
			/* eslint-disable camelcase */
			{
				book_id: 15,
				patron_id: 2,
				loaned_on: '2015-12-10',
				return_by: '2020-10-20',
				returned_on: null,
				active: true
			},
			{
				book_id: 4,
				patron_id: 1,
				loaned_on: '2015-12-11',
				return_by: '2015-12-18',
				returned_on: null,
				active: true
			},
			{
				book_id: 8,
				patron_id: 1,
				loaned_on: '2015-12-12',
				return_by: '2015-12-19',
				returned_on: null,
				active: true
			},
			{
				book_id: 9,
				patron_id: 3,
				loaned_on: '2015-12-13',
				return_by: '2015-12-20',
				returned_on: null,
				active: true
			},
			{
				book_id: 11,
				patron_id: 4,
				loaned_on: '2015-12-13',
				return_by: '2015-12-20',
				returned_on: '2015-12-17',
				active: true
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
		return queryInterface.bulkDelete('Loan', null, {});
	}
};
