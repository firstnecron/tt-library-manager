(function () {
	'use strict';

	angular.module('app')
	// eslint-disable-next-line prefer-arrow-callback
		.directive('confirmDeleteModal', function () {
			return function ($scope, $element) {
				$element.bind('hide.bs.modal', () => {
					if (!$scope.confirmedDelete) {
						$scope.deleteError = undefined;
						$scope.itemToDelete = undefined;
					}
				});
			};
		});
})();
