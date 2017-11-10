const path = require("path");
module.exports = function (app) {

    //src attacks
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/view/index.html"));
    });
};