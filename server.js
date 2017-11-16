// server.js
const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');  // this is needed to parse JSON
const app = express();

//const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/metais';
//const connectionString = 'postgres://localhost:5432/metais';
//const connectionString = "postgres://postgres:T00thp1ck7!@localhost:5432/metais";
//const connectionString = process.env.DATABASE_URL;
var pg = require('pg');

const config = {
    user: 'postgres',
    database: 'metais',
    password: 'T00thp1ck7!',
    port: 5432
};
const pool = new pg.Pool(config);


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
app.get('/db', function (req, res) {

  // var pool = new pg.Pool()
  pool.connect(function (err, client, done) {
    if (err) {
      console.error('could not connect to postgres', err);
    }

    client.query('SELECT * FROM test_table', function (err, result) {
        done();
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
  });
  // pool.end()

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
