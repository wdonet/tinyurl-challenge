var express = require('express');
var url = require('url')
var bodyParser = require('body-parser');
var app = express();
var Firebase = require('firebase');
var db = new Firebase("https://oswaldo-wz.firebaseio.com/");
var baseUrl = 'http://localhost:8080/u/';

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello world');
});

app.get('/u/:hash', function (req, res) {
  var hash = req.params.hash;
  sendData(hash, function(data) {
    res.redirect(data.original);
  });
});

app.get('/read', function (req, res) {
  var parts = url.parse(req.url, true);
  var query = parts.query;
  var hash = query.ozz;
  sendData(hash, function(data) {
        res.send(data.original);
      });
});

var sendData = function(hash, logic) {
  db.once('value', function(snapshot) {
    var data = snapshot.val();
    for(var index in data) {
      if (data[index].hash == hash) {
        logic(data[index]);
        break;
      }       
    }
  });
}

app.get('/tiny', function (req, res) {
	var parts = url.parse(req.url, true);
	var query = parts.query;
	var oldUrl = query.ozz;
	
	//verify param already exists to return it
	// var alreadyNewUrl = exists(oldUrl);
	// if (alreadyNewUrl) {
		// res.send(alreadyNewUrl);
	// }
	var hash = getHashCode(oldUrl);

	//persist it
	db.push({ 'original' : oldUrl, 'hash' : hash });
	res.send(baseUrl + hash);
});

// var exists = function(hash) {
// 	db.child(hash).once('value',
// 	function(val) {
// 		console.log('Already exists -> ' + val[hash])
// 		return val[oldUrl];
// 	},
// 	function (errorObject) {
//   		console.log("The read of '" + oldUrl + "' failed: " + errorObject.code);
// 	});
// 	return false; //todo
// }




var getHashCode = function(oldUrl) {
  var hash = 0, i, chr, len;
  if (oldUrl.length == 0) return hash;
  for (i = 0, len = oldUrl.length; i < len; i++) {
    chr   = oldUrl.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  var result = Math.abs(hash);
  console.log('Hash generated = ' + result);
  return result;
}



var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Listening on ' + port);
});
