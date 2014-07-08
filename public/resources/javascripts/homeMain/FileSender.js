/**
 * FileSender
 * @authors feige05 (hu.feige@gmail.com)
 * @date    2014-07-08 15:18:55
 * @version $Id$
 */

define(['jquery', 'underscore', 'backbone'], function($, _, BackBone) {
	var template;
	/**
	 * 获取模板
	 * @return {_.template} 模板实例
	 */
	function getTemplate() {
		return _.template($('#dataTemplate').html());
	}

	/**
	 * 文件视图
	 * var item = new ItemView({
                data : $model,
                FileSender : filesender
            });
	 */
	var ItemView = Backbone.View.extend({
        template : template || getTemplate(),
        className : "row",
        tagName : "div",
        /*initialize : function() {
        	console.log(this.data);
        	this.render();
        },*/
        render : function(cfg) {
        	this.data       = cfg.data;
        	this.FileSender = cfg.FileSender;
            this.$el.html(this.template(this.data));
            return this;
        },
        events : {
            "click .itemDel" : "itemDel"
        },
        itemDel : function(event) {
            var self = this;
            this.FileSender.destroy(function(){
            	self.$el.remove();
            });
        },
        setInfo : function(txt){
        	this.$el.find('.info').html(txt);
        },
        disable : function(){
        	this.$el.find('button.itemDel').attr('disableed',true);
        },
		destroy: function() {
			this.$el.remove();
		}
    });

	/**
	 * 解释上传的文件名
	 * @param  {String} name [description]
	 * @return {Array}      [appName , dataPath]
	 */
	function parseUrl(name) {
		name = name.split('.');
		var path = name.splice(1)
		path.pop()
		path = path.join('/');
		name = name.concat(path);
		path = null;
		return {
			appName: name[0],
			dataPath: name[1]
		}
	};

	var FileSender = function(key,file){
		if(!(this instanceof FileSender)){
			return new FileSender(key,file);
		}
		this.file = file;
		this.cfg = parseUrl(file.name);
		this.dom = new ItemView();
		this.dom.render({
                data : this.cfg,
                FileSender : this
            });
	}
	
	

	FileSender.prototype.sendData = function sendData() {
		var self = this;
		//创建XHR和FD对象
		var xhr = new XMLHttpRequest,
			dat = new FormData;
		if(self.updated){
			return 
		}
		self.dom.disable();
		self.dom.setInfo('正在上传...');
		//Ajax
		xhr.open("POST", "/setData", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			//接收到服务器返回的数据并输出
			//alert(xhr.responseText);
			self.updated = true;
			self.dom.setInfo('上传完成！');
			setTimeout(self.dom.destroy.bind(self.dom), 1000);
			// self.dom.destroy();
		};
		//向FD对象添加参数
		dat.append("jsonFile", this.file);
		xhr.send(dat);
	};

	FileSender.prototype.destroy = function(cb){
		this.sendData = $.noop;
		this.disabled = true;
		cb();
	} 
	
	/*FileSender.prototype.buildDom = function buildDom() {
		var file = this.file,
		
		//创建FR对象
		var fr = new FileReader;
		
		fr.onload = function() {
			//console.log(fr.result,fr);
		};
		//读取二进制数据到一个字符串中，或者称为字节数组
		fr.readAsBinaryString(file);

	}*/
	return FileSender
});