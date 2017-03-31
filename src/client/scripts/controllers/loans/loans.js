(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.controller('LoansController', function ($scope, DataService) {
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

			getLoans();
		});
})();
