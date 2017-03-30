(function () {
	'use strict';

	angular
		.module('app')
		.config(routeConfig);

	function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				controller: 'HomeController',
				templateUrl: 'templates/home.html'
			})
			.state('books', {
				url: '/books',
				controller: 'BooksController',
				templateUrl: 'templates/books.html'
			})
			.state('books.new', {
				url: '/books/new',
				controller: 'BooksController',
				templateUrl: 'templates/books.html'
			})
			.state('books.edit', {
				url: '/books/edit/:id',
				controller: 'BooksController',
				templateUrl: 'templates/books.html'
			})
			.state('books.detail', {
				url: '/books/:id',
				controller: 'BookDetailController',
				templateUrl: 'templates/book-detail.html'
			})
			.state('patrons', {
				url: '/patrons',
				controller: 'PatronsController',
				templateUrl: 'templates/patrons.html'
			})
			.state('patrons.new', {
				url: '/patrons/new',
				controller: 'PatronsController',
				templateUrl: 'templates/patrons.html'
			})
			.state('patrons.edit', {
				url: '/patrons/edit/:id',
				controller: 'PatronsController',
				templateUrl: 'templates/patrons.html'
			})
			.state('patrons.detail', {
				url: '/patrons/:id',
				controller: 'PatronDetailController',
				templateUrl: 'templates/patron-detail.html'
			})
			.state('loans', {
				url: '/loans/:id?',
				controller: 'LoansController',
				templateUrl: 'templates/loans.html'
			});

		$urlRouterProvider
			.otherwise('/');

		$locationProvider.html5Mode(true);
	}
})();
