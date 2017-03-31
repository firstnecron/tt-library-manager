(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.controller('PatronsController', function ($rootScope, $scope, DataService) {
			function getPatrons() {
				DataService.getPatrons()
					.then(patrons => {
						$scope.$apply(() => {
							$scope.patrons = patrons;
						});
					});
			}
			getPatrons();

			// Listen to state changes to see if it is patrons
			// If so, update (re-retrieve) patrons from database
			const stateListener = $rootScope.$on('$stateChangeSuccess', (event, toState) => {
				if (toState.name.toLowerCase() === 'patrons') {
					getPatrons();
				}
			});

			// When we leave books, remove stateListener
			$scope.$on('$destroy', () => {
				if (angular.isDefined(stateListener)) {
					stateListener();
				}
			});
		});
})();
