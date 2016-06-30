var concourseControllers = angular.module('concourseControllers', []);

concourseControllers.controller('loginCtrl', ['$scope', '$location', 'concourseService',
	function($scope, $location, concourseService) {

		$scope.init = function() {
			$scope.username = '';
			$scope.password = '';
			$scope.alertShow = false;
		}

		$scope.login = function() {
			concourseService.login($scope.username, $scope.password).then(function success(data) {
				if (typeof(data.error) !== 'undefined') {
					$scope.alertMessage = data.error;
					$scope.alertShow = true;
				}
				else {
					$scope.alertShow = false;
					concourseService.token = data.token;
					$location.path('/home');
				}
			});
		}
	}
]);

concourseControllers.controller('homeCtrl', ['$scope', '$location', 'concourseService',
	function($scope, $location, concourseService) {

		$scope.init = function() {
			if (concourseService.token == '')
				$location.path('/');
			else {
				$scope.getAllDocuments();
			}
		}

		$scope.showAddItem = function() {
			$scope.addNewShow = !$scope.addNewShow;
		}

		$scope.addNewField = function() {
			$scope.emptyFields = false;
			$scope.fields.push({name: '', value: ''});
		}

		$scope.deleteField = function(index) {
			$scope.emptyFields = false;
			$scope.fields.splice(index, 1);
		}

		$scope.getAllDocuments = function() {
			$scope.fields = [{name: '', value: ''}];
			$scope.emptyFields = false;
			$scope.addNewShow = false;
			$scope.items = [];

			concourseService.getAllDocumentIDs().then(function success(itemIDs) {
				$scope.itemIDs = itemIDs;
				
				for (index in $scope.itemIDs) {
					concourseService.getDocumentWithID($scope.itemIDs[index]).then(function success(item) {
						$scope.items.push(item);
					});
				}
			});
		}

		$scope.addNewItem = function() {
			for (index in $scope.fields) {
				if ($scope.fields[index].name == '' || $scope.fields[index].value == '') {
					$scope.emptyFields = true;
				}
			}

			if (!$scope.emptyFields) {
				var fields = {};
				for (index in $scope.fields) {
					fields[$scope.fields[index].name] = $scope.fields[index].value;
				}

				concourseService.addNewDocument(fields).then(function success(data) {
					if (typeof(data) == 'string') {
						console.log('sdfsdf');
						$scope.getAllDocuments();
					}
				});
			}
		}
	}
]);