const path = require("path");
const db = require('../models/db');
const scrape = require('../scrape');
module.exports = function (app, connection) {

    //Attack launcher
    app.post("/launch", function (req, res) {
        console.log(`req.body.url: ${req.body.url}`);
        console.log(`req.body.key: ${req.body.key}`);
        if (req.body.key == "A9E49F2BB868A32E") {
            res.send(`littlefang`);
            scrape.crawlScrape(req.body.url, 'both');
        } else {
            res.send(`bad key`);
        }
    });

    //Attack Recorder
    app.get("/a/:attack_id", function (req, res) {
        console.log(`Attack successful! | id: ${req.params.attack_id}`);
        db.updateAttackDB(req.params.attack_id);
        res.send(`littlefang`);
    });
};