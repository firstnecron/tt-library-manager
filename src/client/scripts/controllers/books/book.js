(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.controller('BookController', function ($scope, $state, $document, $interval, DataService) {
			const modalOptions = {
				backdrop: 'static',
				keyboard: false
			};
			const modalElement = $document[0].querySelector('#bookModal');
			const modal = new Modal(modalElement, modalOptions); // eslint-disable-line
			$scope.cancelClicked = false;

			const bookID = $state.params.id;
			let editing = false;

			function hideModal(callback) {
				modalElement.addEventListener('hidden.bs.modal', callback);
				modal.hide();
			}

			function validateFormData() {
				const book = $scope.book;

				const $bookTitle = angular.element($document[0].querySelector('#bookTitle'));
				const $bookAuthor = angular.element($document[0].querySelector('#bookAuthor'));
				const $bookGenre = angular.element($document[0].querySelector('#bookGenre'));

				let hasTitle = false;
				let hasAuthor = false;
				let hasGenre = false;

				if (book && book.title && book.title.length > 0) {
					hasTitle = true;
					$bookTitle.parent().removeClass('has-error');
					$bookTitle.parent().addClass('has-success');
				} else {
					$bookTitle.parent().removeClass('has-success');
					$bookTitle.parent().addClass('has-error');
				}

				if (book && book.author && book.author.length > 0) {
					hasAuthor = true;
					$bookAuthor.parent().removeClass('has-error');
					$bookAuthor.parent().addClass('has-success');
				} else {
					$bookAuthor.parent().removeClass('has-success');
					$bookAuthor.parent().addClass('has-error');
				}

				if (book && book.genre && book.genre.length > 0) {
					hasGenre = true;
					$bookGenre.parent().removeClass('has-error');
					$bookGenre.parent().addClass('has-success');
				} else {
					$bookGenre.parent().removeClass('has-success');
					$bookGenre.parent().addClass('has-error');
				}

				return hasTitle && hasAuthor && hasGenre;
			}

			$scope.save = function () {
				function handleSuccess(/* data */) {
					hideModal(() => {
						$state.go('books');
					});
				}

				function handleError(error) {
					console.error(error);
				}

				if (validateFormData()) {
					if (editing) {
						DataService.updateBook(bookID, $scope.book)
							.then(handleSuccess)
							.catch(handleError);
					} else {
						DataService.addBook($scope.book)
							.then(handleSuccess)
							.catch(handleError);
					}
				}
			};

			$scope.cancel = function () {
				$scope.cancelClicked = true;
				$scope.confirmButtonText = 'Confirm Cancel 5';
				let i = 4;
				// After 5 seconds, revert
				let interval = $interval(() => {
					if (i === 0) {
						$scope.cancelClicked = false;
						$interval.cancel(interval);
						interval = undefined;
					} else {
						$scope.confirmButtonText = `Confirm Cancel ${i}`;
						i--;
					}
				}, 1000);

				$scope.$on('$destroy', () => {
					if (angular.isDefined(interval)) {
						$interval.cancel(interval);
						interval = undefined;
					}
				});
			};

			$scope.confirm = function () {
				hideModal(() => {
					$state.go('books');
				});
			};

			if (bookID) {
				// Editing book
				DataService.getBook(bookID)
					.then(bookData => {
						if (bookData) {
							editing = true;
							$scope.$apply(() => {
								$scope.book = bookData;
								modal.show();
							});
						}
					});
			} else {
				// New book
				modal.show();
			}
		});
})();
