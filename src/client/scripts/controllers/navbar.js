(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.controller('NavbarController', function ($scope, $location) {
			$scope.isActive = function (targetLocation) {
				if (targetLocation === '/') {
					return $location.path() === '/';
				}
				return $location.path().indexOf(targetLocation) === 0;
			};
		});
})();
