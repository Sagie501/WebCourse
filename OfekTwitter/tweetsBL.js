var dataReader = require('./dataReader');
var tweets = [];
// dataReader.tweets().then(function (response) {
//     tweets = response;
// });

function getTweetsById(id) {
    let userTweets = [];
    for (tweet of tweets) {
        if (tweet.user === id) {
            userTweets.push(tweet);
        }
    }
    return userTweets;
}

function getAllTweets() {
    return new Promise(function (resolve) {
        dataReader.tweets().then(function (response) {
            tweets = response;
            resolve(tweets);
        })
    });
}

function addTweet(text, user) {
    tweets.push({text: text, user: user});
    return tweets;
}

module.exports = {
    getTweetsById: getTweetsById,
    getAllTweets: getAllTweets,
    addTweet: addTweet
};