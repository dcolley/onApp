(function () {

	var authSvc = function (cfgSvc, $resource, $localStorage) {

		var _headers = { 
			//'test': 'value',
			// 'X_USERNAME': authSvc.user.username,
			// 'X_PASSWORD': authSvc.user.password,
			//'Content-Type': 'application/json'
		};

		// this.domain = $resource(
		// 	config.apiBaseUrl+'/domain/', 
		// 	{
		// 		id: "@id", cmd: "@cmd"
		// 	}, //parameters default
		// 	{
		// 		list: 	{
		// 			method: "GET",
		// 			params: {},
		// 			isArray: true,
		// 			headers: _headers
		// 		},
		// 		campaigns: { 
		// 			url: config.apiBaseUrl+"/domain/campaigns", 
		// 			method: "GET", 	
		// 			params: { id: 0 },
		// 			isArray: true,
		// 			headers: _headers
		// 		},
		// 		// view: 	{ method: "GET", 	params: { id: 0 }, 		isArray: true, headers: _headers },
		// 		// create: { method: "POST", 	params: { content: "", order: 0, done: false }, isArray: false, headers: _headers },
		// 		// update: { method: "PATCH", 	params: { /*...*/ }, 	isArray: false, headers: _headers },
		// 		// delete: { method: "DELETE", params: { id: 0 }, 		isArray: false, headers: _headers },
		// 		// reset: 	{ method: "GET", 	params: { cmd: "reset" }, isArray: false, headers: _headers },
		// 	}
		// );
		this.risk = $resource(
			cfgSvc.apiBaseUrl+'/risk/', 
			{
				id: "@id", did: "@did", cmd: "@cmd"
			}, //parameters default
			{
				list:	{ method: "GET", 	params: { did: '@did' }, isArray: true, headers: _headers },
				save:	{ method: "POST", 	params: { },	isArray: false, headers: _headers },
				update:	{ method: "PUT", 	params: { id: '@id' },	isArray: false, headers: _headers },
				get:	{ method: "GET",	params: { id: '@id' },	isArray: false, headers: _headers },
				delete: { method: "DELETE", params: { id: '@id' },	isArray: false, headers: _headers },
			}
		);
		this.risk = function() {
			return{
				list: function() {
					return $localStorage.risks;
				},
				save: function(r) {
					$localStorage.risks.unshift(r);
				},
				update: function(r) {
					$localStorage.risks.unshift(r);
				}
			};
		};

		//return (config.useBreeze) ? customersBreezeService : customersService;
		return this;
	};

	angular.module('onApp').factory('authSvc',
		['cfgSvc', '$resource', '$localStorage', authSvc]
	);

}());
