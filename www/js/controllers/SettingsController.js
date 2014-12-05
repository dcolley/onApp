
var SettingsCtrl = function( $state, $scope, $rootScope, $localStorage, $stateParams, cfgSvc  ) {

	$scope.$storage = $rootScope.$localStorage; // = $localStorage.$default({
	$scope.data = $rootScope.data;
	$scope.params = $stateParams;

	if( $scope.$storage.settings === {} ) $scope.reset()

	$scope.settings = $scope.$storage.settings;

	$scope.go = $state.go;

	$scope.reset = function() {
		$scope.settings = $scope.$storage.settings = {
			protocol: 'http',
			hostname: 'demo.opennms.org',
			service: 'opennms/rest',
			port: '80',
			username: 'demo',
			password: 'demo',
			// fullUrl: function() {
			// 	return this.protocol + "://" + this.hostname + ":" + this.port + "/" + this.service;
			// }
		};
	};

	$scope.save = function() {
		$scope.settings.fullUrl = $scope.settings.protocol + "://" 
			+ $scope.settings.hostname + ":" 
			+ $scope.settings.port + "/" 
			+ $scope.settings.service;
		$scope.$storage.settings = $scope.settings;
		// cfgSvc.apiBase = { fullUrl: $scope.settings.fullUrl };
		// cfgSvc.user = { username: $scope.settings.username, password: $scope.settings.password };
		// console.log('full Url now: ' + cfgSvc.apiBase.fullUrl);
	};

};

angular.module('onApp')
.controller( 'SettingsCtrl', ['$state', '$scope', '$rootScope', '$localStorage', 
	'$stateParams', 'cfgSvc', SettingsCtrl] ); 
