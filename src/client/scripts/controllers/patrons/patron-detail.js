(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback, max-params
		.controller('PatronDetailController', function ($rootScope, $scope, $state, DataService, DTOptionsBuilder, DTColumnDefBuilder) {
			const patronID = $state.params.id;
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
				if ($scope.patronDetailForm.$pristine) {
					$scope.updated = true;
				} else {
					DataService.updatePatron(patronID, $scope.patron)
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

			$scope.goBack = goBack;

			if (patronID) {
				// Editing patron
				DataService.getPatron(patronID)
					.then(patronData => {
						$scope.patron = patronData;
						$scope.$apply();
						if (patronData) {
							return DataService.getLoansForPatron(patronData.id);
						}
					})
					.then(loansForPatron => {
						$scope.loans = loansForPatron;
						$scope.$apply();
					});
			} else {
				goBack();
			}
		});
})();
