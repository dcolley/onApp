
angular.module('onApp')

.service('cfgSvc', ['$rootScope', function($rootScope) {
	return {
		htmlBase: "/~derek/ng/opennms/www/",
		// apiBase: { proto: "http" , host: "localhost", port: "1337", service: "", fullUrl: "http://localhost:1337" }
		// apiBase: { proto: "https" , host: "www.netsimple.net", port: "80", service: "/opennms", fullUrl: "https://www.netsimple.net/opennms/rest" },
		apiBase: { fullUrl: "http://demo.opennms.org/opennms/rest" },
		user: { username: "demo", password: "demo" }
		// user: { username: "admin", password: "nati0nal" }
	};
}])

;
