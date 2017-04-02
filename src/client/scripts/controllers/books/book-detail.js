(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback, max-params
		.controller('BookDetailController', function ($scope, $state, DataService, DTOptionsBuilder, DTColumnDefBuilder) {
			const bookID = $state.params.id;
			$scope.updated = false;

			$scope.dtOptions = DTOptionsBuilder
				.newOptions()
				.withDisplayLength(10)
				.withBootstrap()
				.withPaginationType('full_numbers');

			$scope.dtColumnDefs = [
				DTColumnDefBuilder.newColumnDef(0),
				DTColumnDefBuilder.newColumnDef(1),
				DTColumnDefBuilder.newColumnDef(2),
				DTColumnDefBuilder.newColumnDef(3),
				DTColumnDefBuilder.newColumnDef(4),
				DTColumnDefBuilder.newColumnDef(5).notSortable()
			];

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
