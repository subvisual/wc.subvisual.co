var express = require('express');
var pg = require('pg');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/:name', function(request, response) {

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    var query = 'SELECT * FROM bathrooms WHERE name=($1)'
    client.query(query, [req.params.name], function(err, result) {
      done();
      if (err) {
        console.error(err);
        response.send("Error " + err);
      } else {
        response.send(result.rows);
      }
    });
  });
});

app.put('api/:name/:value', function(request, response) {
  var state = (req.params.value == "1") ? true : false

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    var query = 'UPDATE bathrooms SET state=($1) WHERE name=($2)';
    client.query(query, [state, req.params.name], function(err, result) {
      done();
      if (err) {
        console.error(err);
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    });
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
