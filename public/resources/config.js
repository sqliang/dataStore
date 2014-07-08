require.config({
	// make components more sensible
	// expose jquery 
	paths: {
		"components": "../bower_components",
		"jquery": "../bower_components/jquery/dist/jquery",
		"bootstrap": "../bower_components/bootstrap/dist/js/bootstrap",
		"backbone": "../bower_components/backbone/backbone",
		"underscore": "../bower_components/underscore/underscore",
		//"bootstrap-treeview":   "../libs/bootstrap-treeview",
		//"formatDate":   "../libs/jquery.formatDate",
		//"pagination":   "../libs/jquery.pagination"
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'bootstrap-treeview': {
			deps: ['jquery']
		},
		'formatDate': {
			deps: ['jquery']
		},
		'pagination': {
			deps: ['jquery']
		}
	}
});