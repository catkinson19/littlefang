const path = require("path");
module.exports = function (app, connection) {

    //src attacks
    app.get("/:attackTypeId", function (req, res) {
        console.log(`External client requesting ATTACK TYPE: ${req.params.attackTypeId}`);
        //This is a switch to support easy adding of new src attacks
        switch (req.params.attackTypeId) {
            case ('2'):
                console.log('I did a thing!');
                res.sendFile(path.join(__dirname, "../public/src_attacks/src_1.js"));
                break;
            default:
                res.send(`littlefang`);
                break;
        }

    });

    //attack recorder
    app.post("/:attackTypeId", function (req, res) {
        if (req.params.attackTypeId) {
            connection.query("INSERT INTO attack_successful (url, form_id, attack_type_id) VALUES (?, ?, ?)", [
                req.body.u, req.body.f, req.params.attackTypeId
            ], function (err, result) {
                if (err) {
                    // If an error occurred, send a generic server faliure
                    return res.status(500).end();
                }
                console.log(`Successful attack detcted! URL:${req.body.u} | FORM ID:${req.body.f} | ATTACK TYPE: ${req.params.attackTypeId}`)
                res.send(`littlefang`);
            });
        }
    })
};