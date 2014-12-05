
var AlertCtrl = function( $state, $scope, $rootScope, $localStorage, $stateParams, API, logSvc, $http, limitToFilter, filterFilter ) {

	$scope.$storage = $rootScope.$localStorage; // = $localStorage.$default({
	$scope.data = $rootScope.data;
	$scope.params = $stateParams;
	$scope.search = $scope.$storage.search.issue;

	$scope.$watch('search', function(search) {
		$scope.$storage.search.issue = search;
	});

	if( $rootScope.project )
		$scope.project = $rootScope.project;
	else 
		$state.go('user.projects');

	switch( $scope.data.action ) {
		case "List":
			break;
		case "Add":
			$scope.issue = new API.issue({project:{ id:$scope.project.id }, impact:2 });
			break;
		case "View":
			API.issue.getFull( { id: $stateParams.id } ).$promise.then( function( issue, err ) {
				issue.due = new Date( issue.due );
				$scope.issue = issue;
			});
			break;
		case "Edit":
			// if( !$stateParams.id ) alert( "id is not set!");
			API.issue.get( { id: $stateParams.id } ).$promise.then( function( issue, err ) {
				issue.due = new Date( issue.due );
				$scope.issue = issue;
			});
			break;
		default:
			$scope.issue = new API.issue();

	}
	
	$scope.go = $state.go;

	$scope.issues = function( title, status ) {
		return API.issue.query({
			where: {
				project_id: $scope.project.id,
				// title: { '=': title }
				title: { contains: title },
				// like: { name: title },
				// status_id: { contains: status },
			},
			limit:10
		}).$promise.then(function(response){
			// var issues = [];
			return limitToFilter( response.map( function( item ){
				return { id: item.id,title: item.title, };
			}), 15);

		});
	};

	$scope.projectUsers = function( username ) {
		return API.project.users( { id: $scope.project.id }
		// {
		// 	where: {
		// 	// 	username: { contains: username },
		// 	},
		// 	limit:15
		// }
		).$promise.then(function(response){
			// var users = [];
			response = filterFilter(response, username );
			return limitToFilter( response.map( function( item ){
				return { id: item.id,username: item.username, };
			}), 15);

		});
	};

	$scope.setOwner = function( $item ) {
		$scope.ownerId = $item.id;
		$scope.risk.owner = $item;
	};

	$scope.setRisk = function( $item ) {
		// console.info( item );
		$scope.riskId = $item.id;
		// $scope.risktitle = item.title;
	};


	$scope.incrImpact = function() {
		if( $scope.issue.impact < 5 ) {
			$scope.issue.impact++;
			// $scope.updateScore();
		}
	};

	$scope.decrImpact = function() {
		if( $scope.issue.impact > 1 ) {
			$scope.issue.impact--;
			// $scope.updateScore();
		}
	};

	// $scope.scoreMajor = function( s ){
	// 	if( s >  0 && s <  5 ) return 1;
	// 	if( s >  4 && s < 10 ) return 2;
	// 	if( s >  9 && s < 15 ) return 3;
	// 	if( s > 14 && s < 20 ) return 4;
	// 	if( s > 19 ) 		   return 5;
	// };

	$scope.refresh = function() {
		logSvc.trace('starting item refresh');
		try{
			$scope.issue = API.issue.get( { id: $scope.issue.id } );
			logSvc.trace('finished refresh');
		} catch(e) {
			logSvc.error( e );
			alert(e);
		};
	};

	$scope.refreshList = function() {
		logSvc.trace('starting list refresh');
		try{
		//	$scope.$storage.issues = API.issue.list( { pid: $scope.project.id } );
		//	$scope.$storage.issues = $scope.project.issues({ pid: $scope.project.id} );
			$scope.$storage.issues = API.project.issues( { id: $scope.project.id } );
			logSvc.trace('finished refresh');
		} catch(e) {
			logSvc.error( e );
			alert(e);
		};
	};

	// $scope.updateScore = function() {
	// 	$scope.issue.score = $scope.issue.probability * $scope.issue.impact;
	// };

	$scope.save = function( form ) {
		try{
			if( form.$valid ) {
				$scope.issue.project = $scope.project.id;
				$scope.issue.$save().then(function(issue){
					// console.info( issue );
					if( issue.id ) {
						// console.log( 'new id = '+issue.id );
						// $rootScope.$localStorage.risks.unshift( $scope.issue );					
						$rootScope.$localStorage.issues.unshift( issue );					
						$state.go('user.issues', { id: issue.id } );
					};
				});
			};
		} catch(e) {
			alert(e);
		}
	};

	$scope.update = function( ) {
		// var r = $scope.risk;
		// r.id = r.owner = r.reporter = null;
		$scope.issue.project = $scope.issue.project.id;
		$scope.issue.reporter = $scope.issue.reporter.id;
		$scope.issue.owner = $scope.issue.owner.id;
		// console.log( 'due:'+$scope.issue.due );
		if( $scope.issue.$update() ){
			for (var i = 0; i < $rootScope.$localStorage.issues.length; i++) {
				if ($rootScope.$localStorage.issues[i].id === $scope.issue.id) {
					$rootScope.$localStorage.issues[i] = $scope.issue;
				}
			}
			$state.go('user.issues', { id: $scope.params.id } );
		};
	};

	$scope.cancel = function( idx ) {
		// FIXME add a confirmation here
		// delete $scope.$storage.risks.splice(idx, 1);
		$state.go('user.issues', { idx: 1 } );		
	};

	$scope.delete = function() {
		// FIXME add a confirmation here
		// if( confirm("Delete risk["+idx+"]?") ) {
		// 	delete $scope.$storage.risks.splice(idx, 1);
		// 	$state.go('user.risks', { idx: 0 } );
		// };
		$scope.issue.$delete().then(function(issue){
			for (var i = 0; i < $rootScope.$localStorage.issues.length; i++) {
				if( $rootScope.$localStorage.issues[i].id === issue.id ) {
					delete $rootScope.$localStorage.issues.splice( i, 1 );
				}
			}
			$state.go( 'user.issues' );
		});

	};

};

angular.module('onApp').controller( 'IssueCtrl', ['$state', '$scope', '$rootScope', '$localStorage', 
	'$stateParams', 'API', 'logSvc', '$http', 'limitToFilter', 'filterFilter', IssueCtrl] ); 
