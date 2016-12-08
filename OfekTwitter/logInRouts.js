var userBL = require("./userBL");
var dataReader = require('./dataReader');

function routs(app) {
    app.put('/login', function (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        if (userBL.checkUserInUsers(username, password)) {
            res.writeHead(200, {'Content-Type': 'text/text'});
            req.session.user = userBL.findUserNameByUsernameAndPassword(username, password);
            res.end("log in successfully", 'utf-8');
        } else {
            res.writeHead(400, {'Content-Type': 'text/text'});
            res.end("log in faild", 'utf-8');
        }
    });
    app.post("/logout", function (req, res) {
         req.session.user = {};
         res.send("disconnected");
     });
}

module.exports = routs;