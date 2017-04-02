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
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		return_by: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		returned_on: DataTypes.DATEONLY,
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			default: true
		}
		/* eslint-enable camelcase */
	}, {
		timestamps: false,
		classMethods: {
			associate(models) {
				Loan.belongsTo(models.Patron, {foreignKey: 'patron_id'});
				Loan.belongsTo(models.Book, {foreignKey: 'book_id'});
			}
		}
	});
	return Loan;
};
