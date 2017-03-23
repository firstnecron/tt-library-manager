'use strict';

module.exports = {
	up(queryInterface, Sequelize) {
		return queryInterface.createTable('Patrons', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			// eslint-disable-next-line camelcase
			first_name: {
				type: Sequelize.STRING
			},
			// eslint-disable-next-line camelcase
			last_name: {
				type: Sequelize.STRING
			},
			address: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING
			},
			// eslint-disable-next-line camelcase
			library_id: {
				type: Sequelize.STRING
			},
			// eslint-disable-next-line camelcase
			zip_code: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down(queryInterface /* , Sequelize */) {
		return queryInterface.dropTable('Patrons');
	}
};
