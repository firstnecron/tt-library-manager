(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.controller('PatronDetailController', function ($scope, $state, DataService) {
			const patronID = $state.params.id;
			$scope.updated = false;

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

			$scope.goBack = function () {
				$state.go('patrons');
			};

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
				$state.go('patrons');
			}
		});
})();
