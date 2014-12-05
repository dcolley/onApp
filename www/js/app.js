// console.log('loading app.js');

try{

angular.module('onApp', [
  'ui.router',
  // 'onApp.services',
  // 'onApp.directives',
  // 'onApp.controllers',
  // 'ui.calendar',
  'mobile-angular-ui',
  'ngResource',
  // 'ngAnimate',
  // 'ngTouch',
  'ngSanitize',
  'ngStorage'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function (
	$stateProvider, $urlRouterProvider, $locationProvider
	) {


	// ROUTES
	// anon 				-- startup splash, then login or dash
	// anon.about 			-- version, credits, upgrade
	// anon.login

	$stateProvider

	// // Anonymous routes
	// .state('anon', {
	// 	abstract: true,
	// 	url: '/',
	// 	templateUrl: 'basic.html',
	// 	// template: "<ui-view/>",
	// 	data: {
	// 		// access: access.anon
	// 		title: 'Home'
	// // 		breadcrumb  : [{label:"Home",link:"/"},{label:"Fonts",link:"/fonts"},{label:"Font Awesome"}]
	// 	}
	// })
	// // .state('anon.home', {
	// // 	url: 'home',
	// // 	templateUrl: 'pages/contact.html',
	// // 	// controller: 'AboutCtrl',
	// // 	data : {
	// // 		title: 'Home',
	// // 		breadcrumb: [ {label:"Home",link:"/"}, {label:"About"} ] }
	// // })
	// .state('anon.about', {
	// 	url: 'about',
	// 	templateUrl: 'pages/about.html',
	// 	controller: 'AboutCtrl',
	// 	data : {
	// 		title: 'About'//,
	// 		// breadcrumb: [ {label:"Home",link:"/"}, {label:"About"} ] 
	// 	}
	// })
	// // .state('anon.login', {
	// // 	url: 'login',
	// // 	templateUrl: 'pages/login.html',
	// // 	// controller: 'UserCtrl',
	// // 	data : {
	// // 		title: 'Login'
	// // // 		breadcrumb  : [{label:"Home",link:"/"},{label:"Fonts",link:"/fonts"},{label:"Font Awesome"}]
	// // 	}
	// // })
	// .state('anon.help', {
	// 	url: 'help',
	// 	templateUrl: 'pages/help.html',
	// 	// controller: 'UserCtrl',
	// 	data : {
	// 		title: 'Help'//,
	// 		// breadcrumb: [ {label:"Home",link:"/"}, {label:"About"} ] 
	// 	}
	// });

	$stateProvider
	.state('user', {
		abstract: true,
		url: '',
		templateUrl: 'main.html',
		// template: "<ui-view/>",
		data: {
			// access: access.anon
			title: 'User'
	// 		breadcrumb  : [{label:"Home",link:"/"},{label:"Fonts",link:"/fonts"},{label:"Font Awesome"}]
		}
	})
	.state('user.settings', {
		url: 'settings',
		controller: 'SettingsCtrl',
		templateUrl: 'pages/settings.html',
		data : {
			title: 'Settings',
		}
	})
	.state('user.dashboard', {                    // change to 'index.home' to use as home dashboard
		// url: baseUrl+'dashboard-1',
		// url: 'dashboard',
		url: '',
		templateUrl: 'pages/dashboard.html',
		data : {
			title: 'Dashboard',                      // set the page title here
			breadcrumb: [{label:"Dashboard"}]   // remove this to hide the breadcrub
		}
	})

	//  EVENTS --------------------------------------------------------
	.state('user.events', {
		url: 'events',
		controller: 'EventCtrl',
		templateUrl: 'pages/events.html',
		data : {
			navbar: {
				title: 'Events',
			}
		}
	})

	//  NODES --------------------------------------------------------
	.state('user.nodes', {
		url: 'nodes',
		controller: 'NodeCtrl',
		templateUrl: 'pages/nodes.html',
		data : {
			navbar: {
				title: 'Nodes',
			}
		}
	})

	// NOTIFICATIONS ------------------------------------------
	.state('user.notifications', {
		url: 'notifications',
		controller: 'NotificationCtrl',
		templateUrl: 'pages/notifications.html',
		data : {
			navbar: {
				title: 'Notifications',
			}
		}
	})

	// OUTAGES ------------------------------------------
	.state('user.outages', {
		url: 'outages',
		controller: 'OutageCtrl',
		templateUrl: 'pages/outages.html',
		data : {
			navbar: {
				title: 'Outages',
			}
		}
	})


	// RISKS ------------------------------------------
	.state('user.more', {                    // change to 'index.home' to use as home dashboard
		// url: baseUrl+'dashboard-1',
		url: 'more',
		templateUrl: 'pages/more.html',
		data : {
			title: 'More'//,                      // set the page title here
			// breadcrumb: [{label:"Dashboard"}]   // remove this to hide the breadcrub
		}
	})

	.state('user.accounts', {                    // change to 'index.home' to use as home dashboard
		// url: baseUrl+'dashboard-1',
		url: 'accounts/:idx',
		templateUrl: 'pages/accounts.html',
		controller: "AccountCtrl",
		data : {
			action: "",
			// title: 'Accounts',                      // set the page title here
			// breadcrumb: [{label:"Dashboard"}]   // remove this to hide the breadcrub
			navbar: {
				left:  { text: "Risks", icon: "list", state: "user.risk.list" },
				title: 'Accounts',
				right: { text: "Add",   icon: "plus", state: "user.accountAdd" }
			}
		}
	})
	.state('user.accountAdd', {                    // change to 'index.home' to use as home dashboard
		// url: baseUrl+'dashboard-1',
		url: 'account/add',
		controller: 'AccountCtrl',
		templateUrl: 'pages/account.add.html',
		data : {
			navbar: {
				title: 'Add Account'//,                      // set the page title here
			// breadcrumb: [{label:"Dashboard"}]   // remove this to hide the breadcrub
			}
		}
	})
	.state('user.accountEdit', {                    // change to 'index.home' to use as home dashboard
		// url: baseUrl+'dashboard-1',
		url: 'account/edit/:id',
		controller: 'AccountCtrl',
		templateUrl: 'pages/account.add.html',
		data : {
			navbar: {
				title: 'Edit Account'//,                      // set the page title here
			// breadcrumb: [{label:"Dashboard"}]   // remove this to hide the breadcrub
			}
		}
	})

	.state('user.logs', {                    // change to 'index.home' to use as home dashboard
		// url: baseUrl+'dashboard-1',
		url: 'log',
		controller: 'LogCtrl',
		templateUrl: 'pages/logs.html',
		data : {
			// navbar: {
			// 	title: 'Edit Account'//,                      // set the page title here
			// // breadcrumb: [{label:"Dashboard"}]   // remove this to hide the breadcrub
			// }
		}
	});


	// $stateProvider.otherwise('user.accounts');
	$urlRouterProvider.otherwise('user.accounts');
	// $locationProvider.html5Mode(true);
	// $locationProvider.hashPrefix('!');
	
}])

.run(['$location', '$rootScope', '$state', '$localStorage', '$templateCache', function($location, $rootScope, $state, $localStorage,  $templateCache) {
	
	// $rootScope.user = [];
	$rootScope.$localStorage = $localStorage.$default({
		user: {},     // active user - should this be active account?
		settings: {
			protocol: 'http',
			hostname: 'demo.opennms.org',
			service: 'opennms/rest',
			port: '80',
			username: 'demo',
			password: 'demo'			
		},     // can bre placed by account(s) later
		// accounts: [], // list of accounts 
		// account: {},  // active account
		search: [],	  // save search state
		nodes: [], 
		notifications: [], 
		events: [],
		outages: [],
		logs: []
	});

	$rootScope.$on('$stateChangeStart', function(event, current, previous){ 
		if (typeof current.data != "undefined") {			
			$rootScope.data = current.data;
			
			$rootScope.title = current.data.title;
			$rootScope.navbar = current.data.navbar;
			// $rootScope.breadcrumb = current.data.breadcrumb;
			
			// TODO make this for dev only!!!
			// if (typeof(previous) !== 'undefined'){
			// 	$templateCache.remove(previous.templateUrl);
			// }
		}
	});

	// alert( 'going...');
	// $state.go('user.projects');
	// $state.go( 'user.issues' );

}]);

} catch(e) {
	alert(e);
}

// console.log('loading app.js done');
