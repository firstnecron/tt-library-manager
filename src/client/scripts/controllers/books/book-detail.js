(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback, max-params
		.controller('BookDetailController', function ($rootScope, $scope, $state, DataService, DTOptionsBuilder, DTColumnDefBuilder) {
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

			function goBack() {
				if ($rootScope.fromState && $rootScope.fromState.fromState) {
					return $state.go($rootScope.fromState.fromState.name, $rootScope.fromState.fromParams);
				}

				return $state.go('^');
			}

			$scope.save = function () {
				if ($scope.bookDetailForm.$pristine) {
					$scope.updated = true;
				} else {
					DataService.updateBook(bookID, $scope.book)
						.then(() => {
							$scope.updated = true;
							goBack();
							$scope.$apply();
						})
						.catch(() => {
							$scope.updated = false;
							$scope.$apply();
						});
				}
			};

			$scope.goBack = goBack;

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
				goBack();
			}
		});
})();
