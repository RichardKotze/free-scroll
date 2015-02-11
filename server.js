//simple node server setup to run demo files
var express = require('express');
var app = express();
var port = 4012;

app.use(express.static(__dirname));

app.get('/api/listing/', function(req, res) {
	var pageNumber = Number(req.query.page_number) || 0;
	var pageSize = Number(req.query.page_size) || 5;
	var offSet = pageNumber * pageSize;

	if(offSet < result.yourArrayName.length){
		var size = offSet < result.yourArrayName.length ? offSet + pageSize : result.yourArrayName.length;
		res.json({
			pageNumber : pageNumber,
			yourArrayName : result.yourArrayName.slice(offSet, size)
		});
	}else{
		res.statusCode = 404;
    	res.send('Error 404: No listing found');
	}
});

app.listen(process.env.PORT || port);
console.info('localhost:'+port+' ready ...');

var result = {
	yourArrayName: [
		{title: 'Book A', description: 'Book A description'},
		{title: 'Book B', description: 'Book B description'},
		{title: 'Book C', description: 'Book C description'},
		{title: 'Book D', description: 'Book D description'},
		{title: 'Book E', description: 'Book E description'},
		{title: 'Book F', description: 'Book F description'},
		{title: 'Book G', description: 'Book G description'},
		{title: 'Book H', description: 'Book H description'},
		{title: 'Book I', description: 'Book I description'},
		{title: 'Book J', description: 'Book J description'},
		{title: 'Book K', description: 'Book K description'},
		{title: 'Book L', description: 'Book L description'},
		{title: 'Book M', description: 'Book M description'},
		{title: 'Book N', description: 'Book N description'},
		{title: 'Book O', description: 'Book O description'},
		{title: 'Book P', description: 'Book P description'},
		{title: 'Book Q', description: 'Book Q description'},
		{title: 'Book R', description: 'Book R description'},
		{title: 'Book S', description: 'Book S description'},
		{title: 'Book T', description: 'Book T description'},
		{title: 'Book U', description: 'Book U description'},
		{title: 'Book V', description: 'Book V description'},
		{title: 'Book W', description: 'Book W description'},
		{title: 'Book X', description: 'Book X description'},
		{title: 'Book Y', description: 'Book Y description'},
		{title: 'Book Z', description: 'Book Z description'}
	],
	pageNumber: 1
};