var mongoose = require('mongoose');
var Ware = require('../models/Ware');
var dburl="mongodb://localhost/caipiao";
mongoose.connect(dburl);
function saveResults(result){
	for(var i=0;i<result.length;i++){
	    new Ware(result[i]).save(function(err,doc){
	    	if(!err) console.log('插入成功');

	    });
	}
}
 exports.saveResults=saveResults;