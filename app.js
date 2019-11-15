//JSON data
// let inventaryRecords = require('./queries.json');

// console.log(inventaryRecords);

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var path = require('path');

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require('fs');


app.post('/update', function(req, res) {
	console.log(req.body.username);
	if(req.body){
		inventaryRecords.push(req.body);
	}

	fs.writeFile('./queries.json', JSON.stringify(inventaryRecords) , (err) => {
		if (err) {
			throw err;
			res.send("failed to update");

		}
		res.send("success");
		console.log('updated!');
	});
});

app.listen(5000, function(){
	console.log('server running at port 5000');
});
