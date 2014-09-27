var express = require('express');
var pg = require('pg');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

handlePGError = function(err) {
  if (err) return console.error('could not connect to postgres', err);
}


app.get('/', function(req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    handlePGError(err);

    var query = 'SELECT * FROM bathrooms'
    client.query(query, function(err, result) {
      done();
      if (err) {
        console.error(err);
        res.send("Error " + err);
      } else {
        state = result.rows[0]['status'];
        if (state) {
          res.render('busy.html');
        } else {
          res.render('free.html')
        }
      }
    });
  });
});

app.put('/api/:name/:value', function(req, res) {
  var state = (req.params.value == "1") ? true : false

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    handleError(err);

    var query = 'UPDATE bathrooms SET status=($1) WHERE name=($2)';
    client.query(query, [state, req.params.name], function(err, result) {
      done();
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
