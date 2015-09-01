var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Firebase = require('firebase');
var firebaseRef = new Firebase("https://[key-here].firebaseio.com/");

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello world');
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Listening on ' + port);
});
