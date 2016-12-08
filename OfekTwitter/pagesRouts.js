var fs = require('fs');

function pages(app) {
    app.get('/', function (req, res) {
        fs.readFile('./public/html/tweets.html', function (err, content) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content, 'utf-8');
        })
    });

    app.get('/usersPage', function (req, res) {
        fs.readFile('./public/html/users.html', function (err, content) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content, 'utf-8');
        })
    });

    app.get('/signUp', function (req, res) {
        fs.readFile('./public/html/signup.html', function (err, content) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content, 'utf-8');
        })
    });

    app.get('/signIn', function (req, res) {
        fs.readFile('./public/html/signin.html', function (err, content) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content, 'utf-8');
        })
    });
}

module.exports = pages;