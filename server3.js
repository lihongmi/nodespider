 //http 技术模块实现
/* var http = require('http');
  var cheerio=require('cheerio');
var options = {
    host: 'www.dewen.org',
    port: 80,
    path: '/',
    method: 'GET'
};
  
var req = http.get(options, function(res) {
    var pageData = "";
    res.setEncoding('UTF-8');
    res.on('data', function (chunk) {
        pageData += chunk;
    });
    res.on('end', function(){
    	$ = cheerio.load(pageData);
        console.log($(".copyright").html());
        //这里处理抓取到的数据
    });
}); */


var WareBll = require('./bll/WareBll')
var http = require('http');
var cheerio=require('cheerio');
var options = {
    host: 'www.woying.com',
    port: 80,
    path: '/lotterys/gaopin/gd11x5',
    method: 'GET'
};
  
var req = http.get(options, function(res) {
    var pageData = "";
    res.setEncoding('UTF-8');
    res.on('data', function (chunk) {
        pageData += chunk;
    });
  
    res.on('end', function(){
    	$ = cheerio.load(pageData);
		var results=[];
		$('#kjhmb tr').each(function(i){
			if(i>0){
				var tds=$(this).children();
				results.push({issue:tds.eq(0).html(),result:tds.eq(1).html()});
			}
		});
		WareBll.saveResults(results);
        //这里处理抓取到的数据
    });
}); 