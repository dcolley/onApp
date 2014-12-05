// angular.module('PPMTK.services', [])
var logSvc = function( $rootScope ) {

	console.log("inside logSvc...");
	return {
		log: function( text, type ) {
			type = type ? type : "I";
			var d = new Date();
			var datetime = { 
				y:  d.getFullYear(), 
				m:  d.getMonth()+1, // 0-11
				// d:  d.getDate().length  == 2 ? d.getDate() : "0" + d.getDate(), 
				d:  d.getDate(), 
				// h:  d.getHours().length == 2 ? d.getHours() : "0" + d.getHours(), 
				h:  d.getHours(), 
				// mm: d.getMinutes().length == 2 ? d.getMinutes() : "0" + d.getMinutes(),  
				mm: d.getMinutes(), 
				// s:  d.getSeconds().length == 2 ? d.getSeconds() : "0" + d.getSeconds(), 
				s:  d.getSeconds(), 
				ms: d.getMilliseconds()
			};
			var log = { date: datetime, type: type, text: text };
			this.log2( log );
		},
		trace: function( text ) {
			this.log( text, "T" );
		},
		debug: function( text ) {
			this.log( text, "D" );
		},
		info: function( text ) {
			this.log( text, "I" );
		},
		success: function( text ) {
			this.log( text, "S" );
		},
		warn: function( text ) {
			this.log( text, "W" );
		},
		error: function( text ) {
			this.log( text, "E" );
		},
		log2: function( log ){
			// $rootScope.$localStorage.logs.push( log );
			$rootScope.$localStorage.logs.unshift( log );
		},
		clear: function(){
			$rootScope.$localStorage.logs = [];
		}
	};
};

angular.module('onApp').service( 'logSvc', ['$rootScope', logSvc ] ); 

