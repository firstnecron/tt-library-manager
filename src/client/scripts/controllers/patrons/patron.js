(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback, max-params
		.controller('PatronController', function ($rootScope, $scope, $state, $document, $interval, DataService) {
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
					DataService.updatePatron(patronID, $scope.patron)
						.then(handleSuccess)
						.catch(handleError);
				} else {
					DataService.addPatron($scope.patron)
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
