(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.controller('BooksController', function ($scope, DataService) {
			DataService.getBooks()
				.then(books => {
					$scope.$apply(() => {
						$scope.books = books;
					});
				});
		});
})();
