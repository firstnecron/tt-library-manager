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

			const modalOptions = {
				backdrop: 'static',
				keyboard: false
			};
			// eslint-disable-next-line
			const modal = new Modal($document[0].querySelector('#bookModal'), modalOptions);
			modal.show();
		});
})();
