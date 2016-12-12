var userBL = require("./userBL");
var fs = require('fs');

function isUserOnSession(req) {
    return req.session.user != undefined;
}
function isUserExist(req) {
    return userBL.userById(req.session.user._id) != null;
}
function routs(app) {
    app.get('/users', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let users = [];
        userBL.getAllUsers().then(function (response) {
            users = response;
            res.end(JSON.stringify(users), 'utf-8');
        });
    });

    app.get('/users/:id', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(userBL.userById(req.params.id)), 'utf-8');
    });

    app.get('/users/following/:id', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(userBL.getUsersFollowId(req.params.id)), 'utf-8');
    });

    app.post('/users', function (req, res) {
        if (req.body.password === req.body.confirmPassword && userBL.validPassword(req.body.username, req.body.password)) {
            res.writeHead(200, {'Content-Type': 'text/text'});
            fs.writeFile('./json/users.json', JSON.stringify(userBL.addUser(req.body.username, req.body.password)));
            res.end("added user", 'utf-8');
        } else {
            res.writeHead(404, {'Content-Type': 'text/text'});
            res.end("valid password", 'utf-8');
        }
    });

    app.put('/users/following', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/text'});
        fs.writeFile('./json/users.json', JSON.stringify(userBL.addOrRemoveFollower(req.body.userId, req.body.userIdToAddOrRemove)));
        res.end("added following", 'utf-8');
    });

    app.get("/session", function (req, res) {
        if (isUserOnSession(req)) {
            if (isUserExist(req)) {
                res.writeHead(200, {'Content-Type': 'text/json', });
                res.end(JSON.stringify(userBL.userById(req.session.user._id)), 'utf-8');
            } else {
                res.writeHead(404, {'Content-Type': 'text/text', });
                res.end("user not found", 'utf-8');
            }
        } else {
            res.writeHead(400, {'Content-Type': 'text/json', 'Location': '/signIn'});
            res.end(JSON.stringify({_id: "", username: "", following: []}), 'utf-8');
        }
     });
}

module.exports = routs;