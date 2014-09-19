var WareBll = require('./bll/WareBll');
var iconv = require('iconv-lite');
var http=require('http');
var url=require('url');
var querystring=require('querystring');
var encoding = require('encoding');
var BufferHelper=require('BufferHelper');

 http.createServer(function(req,res){
 	 	res.writeHead(200,{'content-type':'text/html;charset=utf-8'});

 	 	var bufferHelper = new BufferHelper();

 	 	if (req.method == "GET") {
 			var objectUrl = url.parse(req.url);
	    	var objectQuery = querystring.parse(objectUrl.query);
 	 		
	   		console.log(JSON.stringify(objectQuery));
 	    	res.end(JSON.stringify(objectQuery));
 	 	}else{
 	 		// 设置接收数据编码格式为 UTF-8
			req.setEncoding("utf8");
			// 因为nodejs在处理post数据的时候，会将数据分成小包来序列处理
		    // 所以必须监听每一个数据小包的结果
			req.addListener("data", function (chunk) {
				bufferHelper.concat(chunk);
			});
			// 所有数据包接收完毕
			req.addListener("end", function () {
				// 解析post数据
				var  _data=iconv.decode(bufferHelper.toBuffer(),'utf8');
				var objectQuery = querystring.parse(_data);
				WareBll.saveResults(JSON.parse(objectQuery.data));
				
			});
 	 	}
 }).listen(1234);