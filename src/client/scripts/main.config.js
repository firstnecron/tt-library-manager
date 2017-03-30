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
			.when('/books', {
				controller: 'BooksController',
				templateUrl: 'templates/books.html'
			})
			.when('/books/new', {
				controller: 'BooksController',
				templateUrl: 'templates/books.html'
			})
			.when('/books/edit/:id', {
				controller: 'BooksController',
				templateUrl: 'templates/books.html'
			})
			.when('/books/:id', {
				controller: 'BookDetailController',
				templateUrl: 'templates/book-detail.html'
			})
			.when('/patrons', {
				controller: 'PatronsController',
				templateUrl: 'templates/patrons.html'
			})
			.when('/patrons/new', {
				controller: 'PatronsController',
				templateUrl: 'templates/patrons.html'
			})
			.when('/patrons/edit/:id', {
				controller: 'PatronsController',
				templateUrl: 'templates/patrons.html'
			})
			.when('/patrons/:id', {
				controller: 'PatronDetailController',
				templateUrl: 'templates/patron-detail.html'
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
