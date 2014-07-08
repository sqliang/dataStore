/**
 * homeMain
 * @authors feige05 (hu.feige@gmail.com)
 * @date    2014-07-04 16:49:35
 * @version $Id$
 */

require(['jquery'], function($) {
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
		return name
	};

	function sendData(key,file){
		//创建XHR和FD对象
		var xhr = new XMLHttpRequest,
			dat = new FormData,
			tmp = parseUrl(file.name);
			//Ajax
		xhr.open("POST", "/setData", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			//接收到服务器返回的数据并输出
			//alert(xhr.responseText);
		};
		//向FD对象添加参数
		dat.append("jsonFile", file);
		xhr.send(dat);
	};

	//拖拽文件事件
	document.ondragover = function(e) {
			e.preventDefault()
	};
	document.ondrop = function(e) {
		//创建XHR和FD对象
		var files = e.dataTransfer.files;
		console.log(files.forEach);
		$.each(files,sendData.bind(this))
		
		//阻止默认拖拽动作
		e.preventDefault();
		console.log(files[0]);
		/*//创建FR对象，这个在上面的例子中介绍过了
		var fr = new FileReader;
		fr.onload = function() {
			console.log(fr.result,fr);
		};
		//读取二进制数据到一个字符串中，或者称为字节数组
		fr.readAsBinaryString(files[0]);*/
		
		
		
	};
})