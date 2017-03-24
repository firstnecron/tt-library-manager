(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.controller('BooksController', function ($scope, DataService) {
			$scope.books = [];
			DataService.getBooks()
				.then(books => {
					$scope.books = books;
				});
		});
})();
