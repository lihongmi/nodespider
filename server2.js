//phantomjs 实现网页抓取   phantomjs --output-encoding=gbk server2.js
var page = require('webpage').create();	
var grasperurl="http://www.woying.com/lotterys/gaopin/gd11x5";
var jqueryUrl='http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
function grasper(){
	page.open(grasperurl, function(status) {
		 page.includeJs(jqueryUrl,function(){
		 	var results=page.evaluate(function() {
				var trs= $('#kjhmb tr:gt(0)');
				var results=[];
				trs.each(function(){
					var tds=$(this).children();
					results.push({issue:tds.eq(0).html(),result:tds.eq(1).html()});
				});
				return results;
			});
			//console.log(JSON.stringify(results));
			saveResults(JSON.stringify(results));
		 });
		
	});	
}

function saveResults(result){
    var server = 'http://localhost:1234/';
    var data = 'data='+result;
    console.log(data);
	page.open(server, 'post', data, function (status) {
	    if (status !== 'success') {
	        console.log('Unable to post!');
	    } else {
	        console.log(page.content);
	    }
	  
	});
}
grasper();

