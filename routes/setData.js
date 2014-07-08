/**
 * setData
 * @authors feige05 (hu.feige@gmail.com)
 * @date    2014-07-04 17:31:21
 * @version $Id$
 */

var express = require('express');
var router = express.Router();
var DataStore = require('../lib/DataStore');
var appCache = {};
var Busboy = require('busboy');

function saveData(res, appName, key, data) {
	var appData;
	if(!appName){
		return res.send(200,{
					"success": false,
					"msg": "保存数据出错！",
					"data": ""
				});
	}
	
	if (appCache.hasOwnProperty(appName)) {
		appData = appCache[appName];
	} else {
		appData = DataStore(appName);
		appCache[appName] = appData;
	}

	if (key) {
		try{
			data = JSON.parse(data)
		}catch(e){
		}
		appData.setData(key, data, function(err, data) {
			if (err || data === null) {
				res.send(200, {
					"success": false,
					"msg": "保存数据出错！",
					"data": ""
				});
			} else {
				if(typeof(data) !== 'object'){
					data = {}
				}
				data["success"] = true;
				data["msg"] = "保存数据成功！";
				res.send(200, data);
			}
		});
	}else{
		res.send(200, {
					"success": false,
					"msg": "保存数据失败,解析文件名失败！",
					"data": "eg. appName.dataPath.file"
				});
	}
}

function parseName(filename) {
	filename = filename.split('.');
	var path = filename.splice(1)
	path.pop()
	path = path.join('/');
	filename = filename.concat(path);
	path = null;
	return filename
}

router.post('/', function(req, res, next) {
	var busboy = new Busboy({
		headers: req.headers
	});
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		var tName = parseName(filename),
			appName = tName[0],
			key = tName[1],
			chunks = [],
			len = 0;

		console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
		file.on('data', function(data) {
			console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
			len += data.length;
			chunks.push(data);
		});
		file.on('end', function() {
			console.log('File [' + fieldname + '] Finished');
			var buffer = new Buffer(len);
            // delay copy
            for(var i = 0, pos = 0, size = chunks.length; i < size; i++) {
                chunks[i].copy(buffer, pos);
                pos += chunks[i].length;
            }
			saveData.call(this, res, appName, key, buffer.toString());
			//res.send(200,buffer.toString());
		});
	});
	busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
		console.log('Field [' + fieldname + ']: value: ' + inspect(val));
	});
	busboy.on('finish', function() {
		console.log('Done parsing form!');
		// res.writeHead(303, {
		// 	Connection: 'close',
		// 	Location: '/'
		// });
		// res.end();
		//res.send(200, '保存数据成功！')
	});
	req.pipe(busboy);

});



module.exports = router;