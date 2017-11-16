// server.js
const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');  // this is needed to parse JSON
const app = express();

var pg = require('pg');

/*
// If not HTTPS, redirect that request to the same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  }
}
// use the forceSSL middleware
app.use(forceSSL());
*/

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


// Test the database
app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});


app.get('/db', function (req, res) {
  res.send('MetaIS - GET: ' + req);
});


app.post('/metais', function (req, res) {
  //var id = req.query["id"];
  //res.send('MetaIS - POST: ' + id);

  //console.log("Hello");
  console.log(req.body.sid);  // we use body-parser to read this

  //var agentID = req.ip;
  //var agentApp = request.headers['user-agent'],

 //$Agent_IP, $Agent_App, $sysID, $sid, $skey, $aid, $data

  // loop the input parameters
  var answer = '';
  for (var propName in req.query) {
      if (req.query.hasOwnProperty(propName)) {
          answer = answer + ';' + req.query[propName]
      }
  }

  res.send('MetaIS - POST: ' + answer + " SID:" + req.body.sid);
});

app.put('/metais', function (req, res) {
  res.send('MetaIS - PUT');
});

app.delete('/metais', function (req, res) {
  res.send('MetaIS - DELETE');
});
