var $  = require('jquery');
var http = require('http');
var fs = require('fs');
$.get("http://www.baidu.com",function(bd){
	var _html = $(bd);
	var imgs = _html.find('img');
	http.get(imgs[0].src, function (res) {
		res.setEncoding('binary');//二进制（binary）
		var imageData ='';
		res.on('data',function(data){//图片加载到内存变量
			imageData += data;
		}).on('end',function(){//加载完毕保存图片
			fs.writeFile('out.gif', imageData, 'binary', function (err) {//以二进制格式保存
				if (err) throw err;
				console.log('file saved');
			});
		});
	});
});