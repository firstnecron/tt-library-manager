(function () {
	'use strict';

	angular
		.module('app')
		.config(routeConfig);

	function routeConfig($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				templateUrl: 'templates/home.html'
			})
			.when('/books/:id?', {
				controller: 'BooksController',
				templateUrl: 'templates/books.html'
			})
			.when('/patrons/:id?', {
				controller: 'PatronsController',
				templateUrl: 'templates/patrons.html'
			})
			.when('/loans/:id?', {
				controller: 'LoansController',
				templateUrl: 'templates/loans.html'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	}
})();
