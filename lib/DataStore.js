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
		"key": key
	}, {
		data: 1,
		_id: 0
	}, callback);
}

module.exports = DataStore;