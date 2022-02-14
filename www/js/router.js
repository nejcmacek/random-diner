angular.module("randomDiner")
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'states/menu/menu.html',
		//controller: 'MenuCtrl'
	})
	
	.state('app.home', {
		url: '/home',
		views: {
			'menuContent': {
				templateUrl: 'states/home/home.html',
				controller: 'HomeCtrl'
			}
		}
	})
	
	.state('app.diners', {
		url: '/diners',
		views: {
			'menuContent': {
				templateUrl: 'states/diners/diners.html',
				controller: 'DinersCtrl'
			}
		}	
	})
	
	// .state('app.diners.diner', {
	// 	url: '/diners/:dinerId',
	// 	views: {
	// 		'menuContent': {
	// 			templateUrl: 'states/diners/diner/diner.html',
	// 			// controller: 'DinerCtrl'
	// 		}
	// 	}
	// })
	
	.state('app.about', {
		url: '/about',
		views: {
			'menuContent': {
				templateUrl: 'states/about/about.html',
				// controller: 'AboutCtrl'
			}
		}
	});
	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/home');
	
});