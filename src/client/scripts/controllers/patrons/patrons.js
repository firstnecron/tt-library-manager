(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback, max-params
		.controller('PatronsController', function ($rootScope, $scope, $document, DataService, DTOptionsBuilder, DTColumnDefBuilder) {
			function getPatrons() {
				DataService.getPatrons()
					.then(patrons => {
						$scope.$apply(() => {
							$scope.patrons = patrons;
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
				DTColumnDefBuilder.newColumnDef(4),
				DTColumnDefBuilder.newColumnDef(5).notSortable()
			];

			// Listen to state changes to see if it is patrons
			// If so, update (re-retrieve) patrons from database
			const stateListener = $rootScope.$on('$stateChangeSuccess', (event, toState) => {
				if (toState.name.toLowerCase() === 'patrons') {
					getPatrons();
				}
			});

			const modalElement = $document[0].querySelector('#confirm-delete-modal');
			const modal = new Modal(modalElement); // eslint-disable-line no-undef
			$scope.confirmedDelete = false;

			$scope.delete = function (patron) {
				// Open modal to confirm deletion
				// Handle button clicks in cancelDelete & confirmDelete
				$scope.itemToDelete = patron;
				modal.show();
			};

			// If confirmation modal was canceled
			$scope.cancelDelete = function () {
				modal.hide();
			};

			$scope.confirmDelete = function () {
				DataService.removePatron($scope.itemToDelete.id)
					.then(() => {
						$scope.confirmedDelete = false;
						modal.hide();
						getPatrons();
						$scope.$apply();
					})
					.catch(error => {
						$scope.deleteError = error.statusText;
						$scope.confirmedDelete = false;
						$scope.$apply();
					});
			};

			// When we leave patrons, remove stateListener
			$scope.$on('$destroy', () => {
				if (angular.isDefined(stateListener)) {
					stateListener();
				}
			});

			getPatrons();
		});
})();
