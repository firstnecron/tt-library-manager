(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.controller('BooksController', function ($rootScope, $scope, DataService) {
			function getBooks() {
				DataService.getBooks()
					.then(books => {
						$scope.$apply(() => {
							$scope.books = books;
						});
					});
			}
			getBooks();

			// Listen to state changes to see if it is books
			// If so, update (re-retrieve) books from database
			const stateListener = $rootScope.$on('$stateChangeSuccess', (event, toState) => {
				if (toState.name.toLowerCase() === 'books') {
					getBooks();
				}
			});

			// When we leave books, remove stateListener
			$scope.$on('$destroy', () => {
				if (angular.isDefined(stateListener)) {
					stateListener();
				}
			});
		});
})();
