concourseApp.service('concourseService', ['$http', '$httpParamSerializerJQLike',
	function($http, $httpParamSerializerJQLike) {
		var service = {};

		service.token = '';

		service.login = function(username, password) {
			return $http({
				method: 'POST',
				url: 'server.php',
				data: $httpParamSerializerJQLike({
					'action': 'login',
					'username': username,
					'password': password
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
			    }
			}).then(function success(response) {
				return response.data;
			});
		}

		service.getAllDocumentIDs = function() {
			return $http({
				method: 'POST',
				url: 'server.php',
				data: $httpParamSerializerJQLike({
					'action': 'getAllDocumentIDs',
					'token': service.token
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
			    }
			}).then(function success(response) {
				return response.data;
			});
		}

		service.getDocumentWithID = function(itemID) {
			return $http({
				method: 'POST',
				url: 'server.php',
				data: $httpParamSerializerJQLike({
					'action': 'getDocumentWithID',
					'itemID': itemID,
					'token': service.token
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
			    }
			}).then(function success(response) {
				return response.data;
			});
		}

		service.addNewDocument = function(data) {
			return $http({
				method: 'POST',
				url: 'server.php',
				data: $httpParamSerializerJQLike({
					'action': 'addNewDocument',
					'token': service.token,
					'items': data
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
			    }
			}).then(function success(response) {
				return response.data;
			});
		}

		return service;
	}
]);