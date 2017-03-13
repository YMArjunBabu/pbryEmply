var pg = require("pg");
var conString = "pg://postgres:post@localhost:5432/empy";
var client = new pg.Client(conString);
