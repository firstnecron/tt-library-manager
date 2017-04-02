(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback, max-params
		.controller('BooksController', function ($rootScope, $scope, $document, DataService, DTOptionsBuilder, DTColumnDefBuilder) {
			function getBooks() {
				DataService.getBooks()
					.then(books => {
						$scope.$apply(() => {
							$scope.books = books;
						});
					});
			}

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
				DTColumnDefBuilder.newColumnDef(4).notSortable()
			];

			// Listen to state changes to see if it is books
			// If so, update (re-retrieve) books from database
			const stateListener = $rootScope.$on('$stateChangeSuccess', (event, toState) => {
				if (toState.name.toLowerCase() === 'books') {
					getBooks();
				}
			});

			const modalElement = $document[0].querySelector('#confirm-delete-modal');
			const modal = new Modal(modalElement); // eslint-disable-line no-undef
			$scope.confirmedDelete = false;

			$scope.delete = function (book) {
				// Open modal to confirm deletion
				// Handle button clicks in cancelDelete & confirmDelete
				$scope.itemToDelete = book;
				modal.show();
			};

			// If confirmation modal was canceled
			$scope.cancelDelete = function () {
				modal.hide();
			};

			$scope.confirmDelete = function () {
				DataService.removeBook($scope.itemToDelete.id)
					.then(() => {
						$scope.confirmedDelete = false;
						modal.hide();
						getBooks();
						$scope.$apply();
					})
					.catch(error => {
						$scope.deleteError = error.statusText;
						$scope.confirmedDelete = false;
						$scope.$apply();
					});
			};

			// When we leave books, remove stateListener
			$scope.$on('$destroy', () => {
				if (angular.isDefined(stateListener)) {
					stateListener();
				}
			});

			getBooks();
		});
})();
