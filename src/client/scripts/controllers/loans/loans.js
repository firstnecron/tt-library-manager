(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.controller('LoansController', function ($rootScope, $scope, DataService) {
			function getLoans() {
				DataService.getLoans()
					.then(loans => {
						$scope.$apply(() => {
							$scope.loans = loans;
						});
					});
			}

			$scope.returnBook = function () {
			};

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
