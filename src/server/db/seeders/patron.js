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
		return queryInterface.bulkInsert('Patron', [
			/* eslint-disable camelcase */
			{
				first_name: 'Andrew',
				last_name: 'Chalkley',
				address: '1234 NE 20st St',
				email: 'andrew.chalkley@teamtreehouse.com',
				library_id: 'MCL1001',
				zip_code: 90210,
				active: true
			},
			{
				first_name: 'Dave',
				last_name: 'McFarland',
				address: '5252 NW 2nd St',
				email: 'dave.mcfarland@teamtreehouse.com',
				library_id: 'MCL1010',
				zip_code: 90210,
				active: true
			},
			{
				first_name: 'Alena',
				last_name: 'Holligan',
				address: '1404 SW 101st St',
				email: 'alena.holligan@teamtreehouse.com',
				library_id: 'MCL1100',
				zip_code: 91210,
				active: true
			},
			{
				first_name: 'Michael',
				last_name: 'Poley',
				address: '7070 NE 10th Ave',
				email: 'michael.poley@teamtreehouse.com',
				library_id: 'MCL1011',
				zip_code: 91310,
				active: true
			},
			{
				first_name: 'Justin',
				last_name: 'Russo',
				address: '11 Test Street',
				email: 'test@test.com',
				library_id: 'MCL1111',
				zip_code: 99854,
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
		return queryInterface.bulkDelete('Person', null, {});
	}
};
