/*configStart*/
require.config({
	// make components more sensible
	// expose jquery 
	paths: {
		"components": "../bower_components",
		"jquery":     "../bower_components/jquery/dist/jquery",
		"bootstrap":  "../bower_components/bootstrap/dist/js/bootstrap",
		"backbone":   "../bower_components/backbone/backbone",
		"underscore": "../bower_components/underscore/underscore",
		"bootstrap-treeview":   "../libs/bootstrap-treeview",
		"formatDate":   "../libs/jquery.formatDate",
		"pagination":   "../libs/jquery.pagination"
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'bootstrap-treeview':{
			deps: ['jquery','bootstrap']
		},
		'formatDate':{
			deps: ['jquery']
		},
		'pagination':{
			deps: ['jquery']
		}
	}
});
/*configEnd*/
require(["bootstrap"]);
require(["jquery"], function($) {
	/**
	 * [basePath AJAX 路径前缀]
	 * @type {String}
	 */
	var basePath='/cdr/';
	/**
	 * [ajax 前置处理]
	 * @param  {[JSON]} options         [jquery 处理后的请求配置]
	 * @param  {[JSON]} originalOptions [原始请求配置]
	 * @param  {[jqXHR]} jqXHR           [AJAX对象]
	 * @return {[type]}                 [description]
	 */
	$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
		//originalOptions.url = originalOptions.url.replace(/^\.\//, basePath);
	});
	/*处理ajax响应状态码*/
	$.ajaxSetup({
		statusCode: {
			622: function() {
				window.location.href = './login';
			},
			623: function() {
				window.location.href = './login';
			}
		}
	});
});

/*require(["underscore"], function(_) {
	_.templateSettings = {
		interpolate: /\{\{=(.+?)\}\}/g,
		evaluate : /\{\{(.+?)\}\}/g,
		escape : /\{\{-(.+?)\}\}/g
	};

});*/

/*扩展 requirejs 功能：做onload模拟*/
require([],function(){
	var scripts = document.getElementsByTagName('script');
	var len = scripts.length;
	var d = null;
	for(var i = len -1 ;i>-1;i--){
		d  = scripts[i].getAttribute('data-require');
		if(d){
			require([d]);
			break;
		}
	}
	scripts = null;
	len = null;
	d = null;
});