(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback, max-params
		.controller('BookController', function ($rootScope, $scope, $state, $document, $interval, DataService) {
			const modalOptions = {
				backdrop: 'static',
				keyboard: false
			};
			const modalElement = $document[0].querySelector('#bookModal');
			const modal = new Modal(modalElement, modalOptions); // eslint-disable-line no-undef
			$scope.cancelClicked = false;

			const bookID = $state.params.id;
			let editing = false;

			function hideModal(callback) {
				modalElement.addEventListener('hidden.bs.modal', callback);
				modal.hide();
			}

			function goBack() {
				if ($rootScope.fromState && $rootScope.fromState.fromState) {
					return $state.go($rootScope.fromState.fromState.name, $rootScope.fromState.fromParams);
				}

				return $state.go('^');
			}

			$scope.save = function () {
				function handleSuccess(/* data */) {
					hideModal(() => {
						goBack();
					});
				}

				function handleError(error) {
					console.error(error);
				}

				if (editing) {
					DataService.updateBook(bookID, $scope.book)
						.then(handleSuccess)
						.catch(handleError);
				} else {
					DataService.addBook($scope.book)
						.then(handleSuccess)
						.catch(handleError);
				}
			};

			$scope.confirm = function () {
				hideModal(() => {
					goBack();
				});
			};

			$scope.$on('$destroy', () => {
				modal.hide();
				const $modalBackdropElement = angular.element($document[0].querySelector('.modal-backdrop'));
				if ($modalBackdropElement) {
					$modalBackdropElement.remove();
				}
			});

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
