//simple node server setup to run demo files
var express = require('express');
var app = express();
var port = 4012;

app.use(express.static(__dirname));

var result = {
	yourArrayName: [
		{title: 'Book A', description: 'Book A description'},
		{title: 'Book B', description: 'Book B description'},
		{title: 'Book C', description: 'Book C description'},
		{title: 'Book D', description: 'Book D description'},
	],
	pageNumber: 1
};

app.get('/api/listing/', function(req, res) {
	var pageNumber = req.query.page_number || 0;
	if(pageNumber <= 2){
		result.pageNumber = pageNumber;
		res.json(result);
	}else{
		res.statusCode = 404;
    	res.send('Error 404: No listing found');
	}
});

app.listen(process.env.PORT || port);
console.info('localhost:'+port+' ready ...');