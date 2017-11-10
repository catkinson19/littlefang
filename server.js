const express = require("express");
const bodyParser = require("body-parser");
const formScraper = require("form-scraper");

const app = express();
const PORT = 9999;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//DB
var mysql = require("mysql");

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
  } else {
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Iwywbmmp.99",
      database: "burgers_db"
    });
  };

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

require("./routes/api_routes.js")(app, connection);
require("./routes/html_routes.js")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
