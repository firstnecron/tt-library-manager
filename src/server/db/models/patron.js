'use strict';

module.exports = function (sequelize, DataTypes) {
	const Patron = sequelize.define('Patron', {
		/* eslint-disable camelcase */
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		library_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		zip_code: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			default: true
		}
		/* eslint-enable camelcase */
	}, {
		timestamps: false,
		classMethods: {
			associate(/* models */) {
				// associations can be defined here
			}
		}
	});
	return Patron;
};
