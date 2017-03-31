(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.controller('BookController', function ($scope, $state, $document, DataService) {
			const bookID = $state.params.id;
			if (bookID) {
				// Editing book
				DataService.getBook(bookID)
					.then(bookData => {
						$scope.book = bookData;
					});
			} else {
				// New book
			}
		});
})();
