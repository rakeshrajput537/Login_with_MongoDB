// **** Common *****
var express = require('express');
const mongoose = require('mongoose'); 
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var path = require('path');
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://rakeshrajput537:<Krish@2014>@cluster0-10c8i.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



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
//  ******** MONGOOSE CONNECTION ********
mongoose.connect(
  "mongodb+srv://rakeshrajput537:Krish@2014@cluster0-10c8i.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true
  }
).then(
  () => {
    console.log("mongoose connected")
  },
  err => {
    console.log("mongoose connection failed");
  }
);
// **********MONGOOSE CONNECTION END ***********

// ** Common  ENd ***
// USER SCHEMA
var nameSchema = mongoose.Schema({
  username : String,
  password : String,
  created : {
    type : Date,
    default : Date.now
  }
});
var User = mongoose.model("User",nameSchema);
// User Schema End

app.post("/addname", (req,res) => {
  var myData = new User(req.body);;
  myData.save()
      .then(item => {
        res.send("name save to databse");
      })
      .catch(err => {
        res.status(400).send("unable to save the data");
      });
});

app.get("/user",function(req,res) {
  console.log(req);
  User.find()
      .exec()
      .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});
app.listen(5001, function(){
	console.log('server running at port 5001');
});
