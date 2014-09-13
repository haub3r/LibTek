// appRoutes.js
	angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		
		.when('/libtek', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		// books page that will use the BookController
		.when('/libtek/books', {
			templateUrl: 'views/book.html',
			controller: 'BookController'
		});

		$locationProvider.html5Mode(true);
		

}]);
