const path = require("path");
const mysql = require("mysql");

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Iwywbmmp.99",
        database: "littlefang"
    });
};

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

//Record attack
function createAttackDB(attackId, formId, elementId, url) {
    connection.query("INSERT INTO launched_attacks (attack_id, form_id, element_id, url) VALUES (?, ?, ?, ?)", [
        attackId, formId, elementId, url
    ], function (err, result) {
        if (err) {
            // If an error occurred, send a generic server faliure
            throw new Error(err);

        }
        console.log(`Recorded attempted attack | attack_id: ${attackId}`);
        return attackId;
    })
};

//Attack successful
function updateAttackDB(attackId) {
    var query = connection.query(
        "UPDATE launched_attacks SET attack_successful = 1 WHERE ?",
        [
            {
                attack_id: attackId
            }
        ],
        function (err, res) {
            console.log(`Successful attack recorded! |  attack_id: ${attackId}`);
        }
    );
}

module.exports = {
    createAttackDB: createAttackDB,
    updateAttackDB: updateAttackDB
}