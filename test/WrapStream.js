/**
 * WrapStream.test
 *
 * @authors feige05 (hu.feige@gmail.com)
 * @date    2014-07-02 14:23:41
 * @version $Id$
 */

var should     = require('should');
var fs         = require('fs');
var WrapStream = require('../lib/WrapStream');
var request    = require('request');
var http       = require('http');
var express    = require('express');
var path       = require('path');

var route = require('../routes/index');

describe('wrapStream test js', function() {
	var port, app;
	before(function(done) {
		app = express();
		app.use(route);
		
		app.listen(0, function() { //this :  http.createServer 
			port = this.address().port;
			done();
		});
	});
	it('success get json', function(done) {
		request('http://127.0.0.1:' + port + '/KS/companyInfo.json', function(err, res, body) {
			body.should.containDeep('newnet');
			console.log(body);
			done(err);
		});
	});
	it('not find json data /KS/Info/aaa.json', function(done) {
		request('http://127.0.0.1:' + port + '/KS/Info/aaa.json', function(err, res, body) {
			body.should.containDeep('数据不存在！');
			console.log(body);
			done(err);
		});

	});
	it('not find json data /../package.json', function(done) {
		request('http://127.0.0.1:' + port + '/../package.json', function(err, res, body) {
			body.should.containDeep('数据不存在！');
			console.log(body);
			done(err);
		});

	});

});

/*http.createServer(function(req, res, next) {

	var stream = fs.createReadStream(__dirname + '/companyInfo.json');
	var form = WrapStream();
	stream.pipe(form).pipe(res);
	stream.on('error', function(err) {
		form.emit('error', err);
		res.end('数据不存在！');
	});

})*/