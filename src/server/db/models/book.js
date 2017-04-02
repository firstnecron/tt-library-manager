'use strict';

module.exports = function (sequelize, DataTypes) {
	const Book = sequelize.define('Book', {
		/* eslint-disable camelcase */
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false
		},
		genre: DataTypes.STRING,
		first_published: DataTypes.INTEGER,
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
				// associations can be defined here
				Book.hasMany(models.Loan, {foreignKey: 'book_id'});
			}
		}
	});
	return Book;
};
