(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback, max-params
		.controller('PatronController', function ($scope, $state, $document, $interval, DataService) {
			const modalOptions = {
				backdrop: 'static',
				keyboard: false
			};
			const modalElement = $document[0].querySelector('#patronModal');
			const modal = new Modal(modalElement, modalOptions); // eslint-disable-line no-undef
			$scope.cancelClicked = false;

			const patronID = $state.params.id;
			let editing = false;

			function hideModal(callback) {
				modalElement.addEventListener('hidden.bs.modal', callback);
				modal.hide();
			}

			$scope.save = function () {
				function handleSuccess(/* data */) {
					hideModal(() => {
						$state.go('patrons');
					});
				}

				function handleError(error) {
					console.error(error);
				}

				if (editing) {
					DataService.updatePatron(patronID, $scope.patron)
						.then(handleSuccess)
						.catch(handleError);
				} else {
					DataService.addPatron($scope.patron)
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
					$state.go('patrons');
				});
			};

			$scope.$on('$destroy', () => {
				modal.hide();
				const $modalBackdropElement = angular.element($document[0].querySelector('.modal-backdrop'));
				if ($modalBackdropElement) {
					$modalBackdropElement.remove();
				}
			});

			if (patronID) {
				// Editing patron
				DataService.getPatron(patronID)
					.then(patronData => {
						if (patronData) {
							editing = true;
							$scope.$apply(() => {
								$scope.patron = patronData;
								modal.show();
							});
						}
					});
			} else {
				// New patron
				modal.show();
			}
		});
})();
