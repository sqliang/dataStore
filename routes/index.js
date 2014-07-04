var express       = require('express');
var router     = express.Router();
var path       = require('path');
var fs         = require('fs');
var WrapStream = require('../lib/WrapStream');


router.get(/^\/(\w+)\/(\S+)$/,function(req, res, next){
			console.log(req.params);
			var dataUrl = path.normalize(__dirname + '/../public/'+req.params[0]+'/' + req.params[1]);
			var stream  = fs.createReadStream(dataUrl);
			var form    = WrapStream();
			stream.on('error', function(err) {
				form.emit('start', true);	
				form.pipe(res);
			});
			stream.on('open', function(){
				form.emit('start', false);
				stream.pipe(form).pipe(res);
			});
		});

router.get('*',function(req, res, next){
		res.send(200,{"success":false,"msg":"请求数据不存在！","data":""});
})
module.exports = router;
