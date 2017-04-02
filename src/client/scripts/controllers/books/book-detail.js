(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.controller('BookDetailController', function ($scope, $state, DataService) {
			const bookID = $state.params.id;
			$scope.updated = false;

			$scope.save = function () {
				if ($scope.bookDetailForm.$pristine) {
					$scope.updated = true;
				} else {
					DataService.updateBook(bookID, $scope.book)
						.then(() => {
							$scope.updated = true;
							$scope.$apply();
						})
						.catch(() => {
							$scope.updated = false;
							$scope.$apply();
						});
				}
			};

			$scope.goBack = function () {
				$state.go('books');
			};

			if (bookID) {
				// Editing book
				DataService.getBook(bookID)
					.then(bookData => {
						$scope.book = bookData;
						$scope.$apply();
						if (bookData) {
							return DataService.getLoansForBook(bookData.id);
						}
					})
					.then(loansForBook => {
						$scope.loans = loansForBook;
						$scope.$apply();
					});
			} else {
				$state.go('books');
			}
		});
})();
