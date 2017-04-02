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
