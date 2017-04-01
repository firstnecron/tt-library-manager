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

			this.getBook = function (bookId) {
				return new Promise((resolve, reject) => {
					$http.get(`${baseUrl}/api/books/${bookId}`)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};

			this.addBook = function (bookData) {
				return new Promise((resolve, reject) => {
					$http.post(`${baseUrl}/api/books`, bookData)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};

			this.updateBook = function (bookId, bookData) {
				return new Promise((resolve, reject) => {
					$http.put(`${baseUrl}/api/books/${bookId}`, bookData)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};

			this.removeBook = function (bookId) {
				return new Promise((resolve, reject) => {
					$http.delete(`${baseUrl}/api/books/${bookId}`)
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

			this.getLoansForBook = function (bookId) {
				return new Promise((resolve, reject) => {
					$http.get(`${baseUrl}/api/books/${bookId}/loans`)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};

			this.getLoansForPatron = function (patronId) {
				return new Promise((resolve, reject) => {
					$http.get(`${baseUrl}/api/patrons/${patronId}/loans`)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};

			this.getLoan = function (loanId) {
				return new Promise((resolve, reject) => {
					$http.get(`${baseUrl}/api/loans/${loanId}`)
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

			this.getPatron = function (patronId) {
				return new Promise((resolve, reject) => {
					$http.get(`${baseUrl}/api/patrons/${patronId}`)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};

			this.addPatron = function (patronData) {
				return new Promise((resolve, reject) => {
					$http.post(`${baseUrl}/api/patrons`, patronData)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};

			this.updatePatron = function (patronId, patronData) {
				return new Promise((resolve, reject) => {
					$http.put(`${baseUrl}/api/patrons/${patronId}`, patronData)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};

			this.removePatron = function (patronId) {
				return new Promise((resolve, reject) => {
					$http.delete(`${baseUrl}/api/patrons/${patronId}`)
						.then(successResponse => {
							resolve(successResponse.data);
						}, errorResponse => {
							reject(errorResponse);
						});
				});
			};
		});
})();
