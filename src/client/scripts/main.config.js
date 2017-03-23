(function () {
	'use strict';

	angular
		.module('app')
		.config(routeConfig);

	function routeConfig($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				controllerAs: 'vm',
				templateUrl: 'templates/home.html'
			})
			.when('/books/:id?', {
				controller: 'BooksController',
				controllerAs: 'vm',
				templateUrl: 'templates/books.html'
			})
			.when('/patrons/:id?', {
				controller: 'PatronsController',
				controllerAs: 'vm',
				templateUrl: 'templates/patrons.html'
			})
			.when('/loans/:id?', {
				controller: 'LoansController',
				controllerAs: 'vm',
				templateUrl: 'templates/loans.html'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	}
})();
