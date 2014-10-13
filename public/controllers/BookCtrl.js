// controllers/BookCtrl.js
angular.module('BookCtrl', []).controller('BookController', function($scope, $http) {
		
	$scope.getBooks = function() {
		$http.get('/libtek/books')
			.success(function(data) {
				$scope.books = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};
		
	$scope.createBook = function() {
		$http.post('/libtek/books', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				console.log(data);
				$scope.getBooks();
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	$scope.deleteBook = function(id) {
		$http.delete('/libtek/books/' + id)
			.success(function(data) {
				console.log(data);
				$scope.getBooks();
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	$scope.tagline = 'Your books below:';
	
	$scope.formData = {};
	
	$scope.getBooks();
});