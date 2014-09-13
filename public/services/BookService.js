// services/BookService.js
angular.module('BookService', []).factory('Book', ['$http', function($http) {

	return {
		// call to get all books
		get : function() {
			return $http.get('/libtek/books');
		},

		// call to POST and create a new book
		create : function(bookData) {
			return $http.post('/libtek/books', bookData);
		},

		// call to DELETE a book
		delete : function(id) {
			return $http.delete('/libtek/books' + id);
		}
	}
	
}]);
