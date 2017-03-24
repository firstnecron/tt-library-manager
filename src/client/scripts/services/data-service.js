(function () {
	'use strict';

	angular.module('app')
		.service('DataService', function ($location, $http) {
			const baseUrl = `http://${$location.host()}:${$location.port()}`;

			/*
				Books
			 */
			this.getBooks = function () {
				return new Promise((resolve, reject) => {
					$http.get(`${baseUrl}/api/books`)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};

			/*
				Loans
			 */
			this.getLoans = function () {
				return new Promise((resolve, reject) => {
					$http.get(`${baseUrl}/api/loans`)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};

			/*
				Patrons
			 */
			this.getPatrons = function () {
				return new Promise((resolve, reject) => {
					$http.get(`${baseUrl}/api/patrons`)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};
		});
})();
