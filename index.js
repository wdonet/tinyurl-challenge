var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello world');
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Listening on ' + port);
});
