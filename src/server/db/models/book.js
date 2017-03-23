'use strict';

module.exports = function (sequelize, DataTypes) {
	const Book = sequelize.define('Book', {
		id: DataTypes.INTEGER,
		title: DataTypes.STRING,
		author: DataTypes.STRING,
		genre: DataTypes.STRING,
		first_published: DataTypes.INTEGER // eslint-disable-line camelcase
	}, {
		classMethods: {
			associate(/* models */) {
				// associations can be defined here
			}
		}
	});
	return Book;
};
