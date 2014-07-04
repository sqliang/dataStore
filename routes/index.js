var express       = require('express');
var router     = express.Router();
var path       = require('path');
var fs         = require('fs');
var WrapStream = require('../lib/WrapStream');
//var DataStore = require('../lib/DataStore');
//var Readable = require('stream').Readable;
//var appCache = {};

/*router.get(/^\/(\w+)\/(\S+)$/,function(req, res, next){
			var appData,
			appName = req.params[0],
			key     = req.params[1];
			if(appCache.hasOwnProperty(appName)){
				appData = appCache[appName];
			}else{
				appData           = DataStore(appName);
				appCache[appName] = appData;
			}
			
			if(key){
				appData.getData(key, function(err, data){
					var form    = Readable();
					if(err){
						form.push('{"success":false,"msg":"请求数据不存在！","data":""}');
					}else{
						form.push('{"success":false,"msg":"请求数据不存在！","data":');
						form.push(data);
						form.push('\n}');
					}

					form.push(null);
					form.pipe(res);
				});
			}
		});*/


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
