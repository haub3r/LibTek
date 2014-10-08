// /tests/mocha/test/libtek.test.js

process.env.NODE_ENV = 'test';

var assert = require("chai").assert;
var http   = require("http");

var server = require("../../../server.js");

describe('UnitTests', function() {
	var url = 'http://localhost:8080/libtek';

	it("should return a 200 response", function (done) {

		http.get(url, function (res) {
			assert.equal(res.statusCode, 200);
			done();
		});
	});

	it("should return HTML", function (done) {

		http.get(url, function (res) {

			var chunks = [];
			res.on("data", function (data) {
				chunks.push(data);
			}).on("end", function () {
				assert.isTrue(chunks.join("").indexOf("</html>") > 0);
				done();
			});

		});
	});
});