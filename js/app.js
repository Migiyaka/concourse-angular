var concourseApp = angular.module('concourseApp', [
	'ngRoute',
	'concourseControllers'
]);

concourseApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'partials/login.html',
			controller: 'loginCtrl'
		}).
		when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'homeCtrl'
		}).
		otherwise({
			redirectTo: '/'
		})
	}
]);