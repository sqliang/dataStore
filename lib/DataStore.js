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

function DataStore(appName) {
	if (!(this instanceof DataStore)) {
		return new DataStore(appName);
	}

	this.collection = db.collection(appName);
}

DataStore.prototype.getData = function(key, callback) {
	this.collection.findOne({
		"_key": key
	}, {
		data: 1,
		_id: 0
	}, callback);
}

DataStore.prototype.saveData = function(key, data, callback, err, oldData) {
	if (oldData) {
		oldData.data = data;
		this.collection.save(oldData, function(e, cb) {
			callback.call(this, e, oldData);
		});
	} else {
		this.collection.insert({
			"_key": key,
			"data": data
		}, {}, callback);
	}
}

DataStore.prototype.setData = function(key, data, callback) {
	this.collection.findOne({
		"_key": key
	}, this.saveData.bind(this,key, data, callback));
	
}

module.exports = DataStore;