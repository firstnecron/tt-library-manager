'use strict';
module.exports = function (sequelize, DataTypes) {
	const Patron = sequelize.define('Patron', {
		id: DataTypes.INTEGER,
		first_name: DataTypes.STRING, // eslint-disable-line camelcase
		last_name: DataTypes.STRING, // eslint-disable-line camelcase
		address: DataTypes.STRING,
		email: DataTypes.STRING,
		library_id: DataTypes.STRING, // eslint-disable-line camelcase
		zip_code: DataTypes.INTEGER // eslint-disable-line camelcase
	}, {
		classMethods: {
			associate(/* models */) {
				// associations can be defined here
			}
		}
	});
	return Patron;
};
