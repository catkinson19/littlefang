const express = require("express");
const bodyParser = require("body-parser");
const formScraper = require("form-scraper");

const app = express();
var PORT = process.env.PORT || 9999;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

require("./routes/api_routes.js")(app);
require("./routes/html_routes.js")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
