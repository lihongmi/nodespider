 //nodegrass 技术模块实现
 /* var nodegrass = require('nodegrass');
var http=require('http');
 http.createServer(function(req,res){
 	    res.writeHead(200,{'content-type':'text/html'});
 		nodegrass.get("http://www.baidu.com",function(data,status,headers){
 	    res.end(data);
 	},'utf8').on('error', function(e) {
 	    console.log("Got error: " + e.message);
	});

 }).listen(9999); */
 
 
 
 
var WareBll = require('./bll/WareBll');
var cheerio=require('cheerio');
var nodegrass = require('nodegrass');
var grasperurl="http://www.woying.com/lotterys/gaopin/gd11x5";
  
 nodegrass.get(grasperurl,function(data,status,headers){
		$ = cheerio.load(data);
		var results=[];
		$('#kjhmb tr').each(function(i){
			if(i>0){
				var tds=$(this).children();
				results.push({issue:tds.eq(0).html(),result:tds.eq(1).html()});
			}
		});
		WareBll.saveResults(results);
		
 	},'utf8').on('error', function(e) {
 	    console.log("Got error: " + e.message);
	});