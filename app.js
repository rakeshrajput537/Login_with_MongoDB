// **** Common *****
var express = require('express');
const mongoose = require('mongoose'); 
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var path = require('path');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rakeshrajput537:<Krish@2014>@cluster0-10c8i.mongodb.net/sample_mflix?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("sample_mflix").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ 
	extended: true 
}));
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header (
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept,Authorization"
  );
  if(req.method==="OPTIONS"){
    res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
const fs = require('fs');

// ** Common ***


app.listen(5001, function(){
	console.log('server running at port 5001');
});
