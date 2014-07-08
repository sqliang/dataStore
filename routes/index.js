/**
 * index.js
 * @authors feige05 (hu.feige@gmail.com)
 * @date    2014-07-04 14:41:48
 * @version $Id$
 */
var express       = require('express');
var router     = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.sendfile('public/index.html')
  //res.render('index', { title: 'Express' });
});


exports.index = router;

exports.dataStore = require('./dataStore');

exports.users = require('./users');
exports.setData = require('./setData');