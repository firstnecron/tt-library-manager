(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback, max-params
		.controller('LoansController', function ($rootScope, $scope, DataService, DTOptionsBuilder, DTColumnDefBuilder) {
			function getLoans() {
				DataService.getLoans()
					.then(loans => {
						$scope.$apply(() => {
							$scope.loans = loans;
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

			// Listen to state changes to see if it is loans
			// If so, update (re-retrieve) loans from database
			const stateListener = $rootScope.$on('$stateChangeSuccess', (event, toState) => {
				if (toState.name.toLowerCase() === 'loans') {
					getLoans();
				}
			});

			// When we leave loans, remove stateListener
			$scope.$on('$destroy', () => {
				if (angular.isDefined(stateListener)) {
					stateListener();
				}
			});

			getLoans();
		});
})();
