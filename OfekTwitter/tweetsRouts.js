var tweetsBL = require('./tweetsBL');
var fs = require('fs');

function routs(app) {
    app.get('/tweets/:id', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(tweetsBL.getTweetsById(req.params.id)), 'utf-8');
    });

    app.get('/tweets', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let tweets = [];
        tweetsBL.getAllTweets().then(function (response) {
            tweets = response;
            res.end(JSON.stringify(tweets), 'utf-8');
        });
    });

    app.put('/tweets', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/text'});
        let text = req.body.text.replace(/[<]/g,'&lt').replace(/[>]/g,'&gt');
        fs.writeFile('./json/tweets.json', JSON.stringify(tweetsBL.addTweet(text, req.body.user)));
        res.end("add tweet", 'utf-8');
    });
}

module.exports = routs;