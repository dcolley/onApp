
var EventCtrl = function( $state, $scope, $rootScope, $localStorage, $stateParams, API, logSvc, $http, limitToFilter, filterFilter ) {

	$scope.$storage = $rootScope.$localStorage; // = $localStorage.$default({
	$scope.data = $rootScope.data;
	$scope.params = $stateParams;
	$scope.search = $scope.$storage.search.issue;

	$scope.$watch('search', function(search) {
		$scope.$storage.search.event = search;
	});

	// if( $rootScope.project )
	// 	$scope.project = $rootScope.project;
	// else 
	// 	$state.go('user.projects');

	switch( $scope.data.action ) {
		case "List":
			break;
		case "Add":
			$scope.model = new API.event();
			break;
		case "View":
			API.event.get( { id: $stateParams.id } ).$promise.then( function( model, err ) {
				// issue.due = new Date( issue.due );
				$scope.model = model;
			});
			break;
		case "Edit":
			// if( !$stateParams.id ) alert( "id is not set!");
			API.event.get( { id: $stateParams.id } ).$promise.then( function( model, err ) {
				// issue.due = new Date( issue.due );
				$scope.model = model;
			});
			break;
		default:
			$scope.model = new API.event();

	}
	
	$scope.go = $state.go;

	// $scope.issues = function( title, status ) {
	// 	return API.issue.query({
	// 		where: {
	// 			project_id: $scope.project.id,
	// 			// title: { '=': title }
	// 			title: { contains: title },
	// 			// like: { name: title },
	// 			// status_id: { contains: status },
	// 		},
	// 		limit:10
	// 	}).$promise.then(function(response){
	// 		// var issues = [];
	// 		return limitToFilter( response.map( function( item ){
	// 			return { id: item.id,title: item.title, };
	// 		}), 15);

	// 	});
	// };

	// $scope.projectUsers = function( username ) {
	// 	return API.project.users( { id: $scope.project.id }
	// 	// {
	// 	// 	where: {
	// 	// 	// 	username: { contains: username },
	// 	// 	},
	// 	// 	limit:15
	// 	// }
	// 	).$promise.then(function(response){
	// 		// var users = [];
	// 		response = filterFilter(response, username );
	// 		return limitToFilter( response.map( function( item ){
	// 			return { id: item.id,username: item.username, };
	// 		}), 15);

	// 	});
	// };

	// $scope.refresh = function() {
	// 	logSvc.trace('starting item refresh');
	// 	try{
	// 		$scope.issue = API.issue.get( { id: $scope.issue.id } );
	// 		logSvc.trace('finished refresh');
	// 	} catch(e) {
	// 		logSvc.error( e );
	// 		alert(e);
	// 	};
	// };

	$scope.refreshList = function() {
		$scope.$storage.events = [];
		$scope.offset = 0;
		$scope.loadMore();
	};

	$scope.loadMore = function() {
		API.event.list({
			limit: 20,
			offset: $scope.offset,
			orderBy: "id",
			order: "desc"
		}).$promise.then( function( res ) {

			if( res['count'] ) {
				angular.forEach( res['event'], function( value, key ) {
					// console.log('pushing');
					$scope.$storage.events.push( value );
				}) ;
			};
			$scope.offset = $scope.offset + parseInt(res['count']);

		});
		// $scope.$storage.notifications = $scope.$storage.notifications.concat(models);
		
	};
    
	$scope.offset = 0;
	$scope.loadMore();

};

angular.module('onApp').controller( 'EventCtrl', ['$state', '$scope', '$rootScope', '$localStorage', 
	'$stateParams', 'API', 'logSvc', '$http', 'limitToFilter', 'filterFilter', EventCtrl] ); 
