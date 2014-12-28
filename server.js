//simple node server setup to run demo files
var express = require('express');
var app = express();
var port = 4012;

app.use(express.static(__dirname));

var listing = [
	{title: 'Book A', description: 'Book A description'},
	{title: 'Book B', description: 'Book B description'},
	{title: 'Book C', description: 'Book C description'},
	{title: 'Book D', description: 'Book D description'},
];

app.get('/api/listing', function(req, res) {
  res.json(listing);
});

app.listen(process.env.PORT || port);
console.info('localhost:'+port+' ready ...');