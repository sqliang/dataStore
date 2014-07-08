/**
 * homeMain
 * @authors feige05 (hu.feige@gmail.com)
 * @date    2014-07-04 16:49:35
 * @version $Id$
 */

require(['jquery','javascripts/homeMain/FileSender'], function($,FileSender) {
	var fileLists=[];
	//拖拽文件事件
	document.ondragover = function(e) {
			e.preventDefault()
	};
	document.ondrop = function(e) {

		//创建XHR和FD对象
		var files = e.dataTransfer.files;
		//阻止默认拖拽动作
		e.preventDefault();
		$.each(files, function(key,file){
			var file = FileSender(key,file)
			$('#fileLists').append(file.dom.$el);
			fileLists.push(file);
		})
		
		
		//console.log(files[0]);
	};

	$('#sendDataBtn').click(function(){
		$.each(fileLists,function(key,sender){
			sender.sendData();
		})
	})
})