
var NavCtrl = function( $rootScope, $scope ) {

	$scope.isLoggedIn = function() {
		return true;
		// return true;
	};

	// $scope.toggle = $rootScope.toggle;
	// console.log( 'NavCtrl: isLoggedIn: '+ $scope.isLoggedIn() );

	// $scope.toggleLeft = function() {
	// 	$mdSidenav('left').toggle();
	// };
	// $scope.toggleRight = function() {
	// 	$mdSidenav('right').toggle();
	// };

};

angular.module('onApp')
.controller( 'NavCtrl', ['$rootScope', '$scope', NavCtrl ] )

// .controller('LeftCtrl', function($scope, $timeout, $mdSidenav) {
// 	$scope.close = function() {
// 		$mdSidenav('left').close();
// 	};
// })

// .controller('RightCtrl', function($scope, $timeout, $mdSidenav) {
// 	$scope.close = function() {
// 		$mdSidenav('right').close();
// 	};
// })
; 


