'use strict';

const Book = require('./').Book;
const Patron = require('./').Patron;

module.exports = function (sequelize, DataTypes) {
	const Loan = sequelize.define('Loan', {
		/* eslint-disable camelcase */
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		book_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Book,
				key: 'id'
			}
		},
		patron_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Patron,
				key: 'id'
			}
		},
		loaned_on: {
			type: DataTypes.DATE,
			allowNull: false
		},
		return_by: {
			type: DataTypes.DATE,
			allowNull: false
		},
		returned_on: DataTypes.DATE
		/* eslint-enable camelcase */
	}, {
		timestamps: false,
		classMethods: {
			associate(/* models */) {
				// associations can be defined here
			}
		}
	});
	return Loan;
};
