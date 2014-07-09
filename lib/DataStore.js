/**
 * DataStore
 * @authors feige05 (hu.feige@gmail.com)
 * @date    2014-07-04 12:40:38
 * @version $Id$
 */
var mongoskin = require('mongoskin'),
	db = mongoskin.db('mongodb://@localhost:27017/dataServer', {
		safe: true
	});

function DataStore(tabName) {
	if (!(this instanceof DataStore)) {
		return new DataStore(tabName);
	}
	this.collection = db.collection(tabName);
}

DataStore.prototype.getData = function(appName, key, callback) {
	this.collection.findOne({
		"_key": key,
		"_appName":appName
	}, {
		data: 1,
		_id: 0
	}, callback);
}

DataStore.prototype.saveData = function(appName, key, data, callback, err, oldData) {
	if (oldData) {
		oldData.data = data;
		this.collection.save(oldData, function(e, cb) {
			callback.call(this, e, oldData);
		});
	} else {
		this.collection.insert({
			"_key": key,
			"_appName":appName,
			"data": data
		}, {}, callback);
	}
}

DataStore.prototype.setData = function(appName, key, data, callback) {
	this.collection.findOne({
		"_key": key
	}, this.saveData.bind(this,appName,key, data, callback));
	
}

module.exports = new DataStore('Datas');