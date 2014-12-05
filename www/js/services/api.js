(function () {

	var API = function (cfgSvc, authSvc, $resource, $rootScope, logSvc) {

	// FIXME - some hacking to make old structures work...
		cfgSvc = $rootScope.$localStorage.settings;
		cfgSvc.apiBase = { fullUrl: cfgSvc.fullUrl };

		var _headers = { 
			//'test': 'value',
			// 'X_USERNAME': authSvc.user.username,
			// 'X_PASSWORD': authSvc.user.password,
	// FIXME: temp solution until this is moved into Account:Server Config section
			'Authorization': 'Basic '+btoa( cfgSvc.username + ":" + cfgSvc.password ),
			"X-Requested-With": "XMLHttpRequest",
			"Accept": "application/json"
			//'Content-Type': 'application/json'
		};

		this.event = $resource(
			cfgSvc.apiBase.fullUrl+'/events/:id', 
			{
				id: "@id", orderBy: "@orderBy", order: "@order", offset: "@offset", limit: '@limit'
			}, //parameters default
			{
			// /events	Get a list of nodes. This includes the ID and node label.
				list: {
					method: "GET",
					params: { orderBy: "@orderBy", order: "@order", limit: '@limit', offset: '@offset' }, 
					isArray: false, 
					headers: _headers,
					transformResponse: function( data, header ){
						// var jsonData = JSON.parse(data); //or angular.fromJson(data)
						// return jsonData.event;
						return JSON.parse(data); //or angular.fromJson(data)
					}
				},
			}
		);
		this.node = $resource(
			cfgSvc.apiBase.fullUrl+'/nodes/:id', 
			{
				id: "@id", orderBy: "@orderBy", order: "@order", offset: "@offset", limit: '@limit', ipAddress: "@ipAddress"
			}, //parameters default
			{
			// /nodes	Get a list of nodes. This includes the ID and node label.
				list: {
					method: "GET",
					params: { limit: 0 }, 
					isArray: false, 
					headers: _headers,
					transformResponse: function( data, header ){
						// var jsonData = JSON.parse(data); //or angular.fromJson(data)
						// return jsonData.node;
						return JSON.parse(data); //or angular.fromJson(data)
					}
				},

			// /nodes/{id}	Get a specific node, by ID.
				get:  { method: "GET",	params: { id: '@id' }, isArray: false, headers: _headers },
			// /nodes/{id}/ipinterfaces	Get the list of IP interfaces associated with the given node.
				ipinterfaces: { url: cfgSvc.apiBase.fullUrl+"/nodes/:id/ipinterfaces", 
					  method: "GET", params: { id: '@id' },	isArray: true,	headers: _headers },
			// /nodes/{id}/ipinterfaces/{ipAddress}	Get the IP interface for the given node and IP address.
				ipinterface: { url: cfgSvc.apiBase.fullUrl+"/nodes/:id/ipinterfaces/:ipAddress", 
					  method: "GET", params: { id: '@id', ipAddress: '@ipAddress' },	isArray: true,	headers: _headers },
			// /nodes/{id}/ipinterfaces/{ipAddress}/services	Get the list of services associated with the given node and IP interface.
				services: { url: cfgSvc.apiBase.fullUrl+"/nodes/:id/services", 
					  method: "GET", params: { id: '@id' },	isArray: true,	headers: _headers },
			// /nodes/{id}/ipinterfaces/{ipAddress}/services/{service}	Get the requested service associated with the given node, IP interface, and service name.
			// /nodes/{id}/snmpinterfaces	Get the list of SNMP interfaces associated with the given node.
			// /nodes/{id}/snmpinterfaces/{ifIndex}	Get the specific interface associated with the given node and ifIndex.
			// /nodes/{id}/categories	Get the list of categories associated with the given node.
			// /nodes/{id}/categories/{categoryName}	Get the category associated with the given node and category name.
			// /nodes/{id}/assetRecord	Get the asset record associated with the given node.
				// save:	{ method: "POST", 	params: { }, isArray: false, headers: _headers },
				// update:	{ method: "PUT", 	params: { id: '@id' },	isArray: false, headers: _headers },
				// delete: { method: "DELETE", params: { id: '@id' },	isArray: false, headers: _headers },
			}
		);
		this.notification = $resource(
			cfgSvc.apiBase.fullUrl+'/notifications/:id', 
			{
				id: "@id", orderBy: "@orderBy", order: "@order", offset: "@offset", limit: '@limit', ipAddress: "@ipAddress"
			}, //parameters default
			{
			// /notifications	Get a list of nodes. This includes the ID and node label.
				list: {
					method: "GET",
					params: { limit: '@limit', offset: '@offset' }, 
					isArray: false, 
					headers: _headers,
					transformResponse: function( data, header ){
						// var jsonData = JSON.parse(data); //or angular.fromJson(data)
						// return jsonData.notification;
						return JSON.parse(data); //or angular.fromJson(data)
					}
				},
			}
		);
		this.outage = $resource(
			cfgSvc.apiBase.fullUrl+'/outages/:id', 
			{
				id: "@id", orderBy: "@orderBy", order: "@order", offset: "@offset", limit: '@limit', ipAddress: "@ipAddress"
			}, //parameters default
			{
			// /outages	Get a list of nodes. This includes the ID and node label.
				list: {
					method: "GET",
					params: { limit: '@limit', offset: '@offset' }, 
					isArray: true, 
					headers: _headers,
					transformResponse: function( data, header ){
						var jsonData = JSON.parse(data); //or angular.fromJson(data)
						return jsonData.outage;
					}
				},
			}
		);
	};

	angular.module('onApp').service('API',
		['cfgSvc', 'authSvc', '$resource', '$rootScope', 'logSvc', API]
	);

}());
