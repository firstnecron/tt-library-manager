'use strict';
module.exports = function (sequelize, DataTypes) {
	const Loan = sequelize.define('Loan', {
		id: DataTypes.INTEGER,
		book_id: DataTypes.INTEGER, // eslint-disable-line camelcase
		patron_id: DataTypes.INTEGER, // eslint-disable-line camelcase
		loaned_on: DataTypes.DATE, // eslint-disable-line camelcase
		return_by: DataTypes.DATE, // eslint-disable-line camelcase
		returned_on: DataTypes.DATE // eslint-disable-line camelcase
	}, {
		classMethods: {
			associate(/* models */) {
				// associations can be defined here
			}
		}
	});
	return Loan;
};
