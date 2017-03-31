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
				templateUrl: 'templates/books/books.html'
			})
			.state('books.new', {
				url: '/new',
				views: {
					child: {
						controller: 'BookController',
						templateUrl: 'templates/books/book.html'
					}
				}
			})
			.state('books.edit', {
				url: '/edit/:id',
				views: {
					child: {
						controller: 'BookController',
						templateUrl: 'templates/books/book.html'
					}
				}
			})
			.state('book-detail', {
				url: '/books/:id',
				controller: 'BookDetailController',
				templateUrl: 'templates/books/book-detail.html'
			})
			.state('patrons', {
				url: '/patrons',
				controller: 'PatronsController',
				templateUrl: 'templates/patrons/patrons.html'
			})
			.state('patrons.new', {
				url: '/new',
				views: {
					child: {
						controller: 'PatronController',
						templateUrl: 'templates/patrons/patron.html'
					}
				}
			})
			.state('patrons.edit', {
				url: '/edit/:id',
				views: {
					child: {
						controller: 'PatronController',
						templateUrl: 'templates/patrons/patron.html'
					}
				}
			})
			.state('patron-detail', {
				url: '/patrons/:id',
				controller: 'PatronDetailController',
				templateUrl: 'templates/patrons/patron-detail.html'
			})
			.state('loans', {
				url: '/loans/:id?',
				controller: 'LoansController',
				templateUrl: 'templates/loans/loans.html'
			});

		$urlRouterProvider
			.otherwise('/');

		$locationProvider.html5Mode(true);
	}
})();
