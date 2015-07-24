var config = require('./config');
var pg = require('pg');

var user = config.database.user;
var password = config.database.password;
var machine = config.database.machine;
var database = config.database.name;

var conString = "postgres://" + user +":" + password + "@" + machine + "/" + database;
var client = new pg.Client(conString);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT * FROM ' + config.database.table + ';', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0]);
    client.end();
  });
});