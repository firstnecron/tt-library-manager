(function () {
	'use strict';

	angular.module('app')
	/* global moment */
	// eslint-disable-next-line prefer-arrow-callback, max-params
		.controller('LoanController', function ($rootScope, $scope, $state, $document, $interval, DataService) {
			const dateFormat = 'YYYY-MM-DD';
			const modalOptions = {
				backdrop: 'static',
				keyboard: false
			};
			const modalElement = $document[0].querySelector('#loan-modal');
			const modal = new Modal(modalElement, modalOptions); // eslint-disable-line no-undef

			const loanID = $state.params.id;
			$scope.returning = false;

			function hideModal(callback) {
				modalElement.addEventListener('hidden.bs.modal', callback);
				modal.hide();
			}

			// Format dates using dateFormat to store in database
			function formatDates(loan) {
				if ($scope.returning) {
					loan.returned_on = moment(loan.returned_on).format(dateFormat); // eslint-disable-line camelcase
				} else {
					loan.loaned_on = moment(loan.loaned_on).format(dateFormat); // eslint-disable-line camelcase
					loan.return_by = moment(loan.return_by).format(dateFormat); // eslint-disable-line camelcase
				}

				return loan;
			}

			function goBack() {
				if ($rootScope.fromState && $rootScope.fromState.fromState) {
					return $state.go($rootScope.fromState.fromState.name, $rootScope.fromState.fromParams);
				}

				return $state.go('^');
			}

			$scope.save = function () {
				function handleSuccess(/* data */) {
					hideModal(() => {
						goBack();
					});
				}

				function handleError(error) {
					console.error(error);
				}

				if ($scope.returning) {
					DataService.updateLoan(loanID, {returned_on: formatDates($scope.loan.returned_on).returned_on}) // eslint-disable-line camelcase
						.then(handleSuccess)
						.catch(handleError);
				} else {
					const loan = formatDates($scope.loan);

					DataService.addLoan(loan)
						.then(handleSuccess)
						.catch(handleError);
				}
			};

			$scope.confirm = function () {
				hideModal(() => {
					goBack();
				});
			};

			$scope.$on('$destroy', () => {
				modal.hide();
				const $modalBackdropElement = angular.element($document[0].querySelector('.modal-backdrop'));
				if ($modalBackdropElement) {
					$modalBackdropElement.remove();
				}
			});

			if (loanID) {
				// Returning loan
				DataService.getLoan(loanID)
					.then(loanData => {
						if (loanData) {
							$scope.returning = true;

							// Turn database dates into Dates
							loanData.loaned_on = moment(loanData.loaned_on, dateFormat).toDate(); // eslint-disable-line camelcase
							loanData.return_by = moment(loanData.return_by, dateFormat).toDate(); // eslint-disable-line camelcase
							loanData.returned_on = new Date(); // eslint-disable-line camelcase
							$scope.$apply(() => {
								$scope.loan = loanData;
								modal.show();
							});
						}
					});
			} else {
				// New loan
				// Get all books available to take out and patrons
				DataService.getAvailableBooks()
					.then(books => {
						$scope.books = books;
						return DataService.getPatrons();
					})
					.then(patrons => {
						$scope.patrons = patrons;

						$scope.loan = {};
						$scope.loan.loaned_on = moment().toDate(); // eslint-disable-line camelcase
						$scope.loan.return_by = moment().add(7, 'days').toDate(); // eslint-disable-line camelcase

						$scope.$apply();
						modal.show();
					})
					.catch(error => {
						console.error(error);
						goBack();
					});
			}
		});
})();
