(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.directive('confirmCancelButton', function ($interval) {
			return function ($scope) {
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
			};
		});
})();
