var tweets = [
    {username: 'Bobo', text: 'hello followers!'},
    {username: 'Elvis', text: 'this exercise is really easy!'},
    {username: 'Mimi', text: 'I want to go to sleep'}
];

window.onload = function () {
    showTweets(tweets);

    test_group("Checking publishing", function () {
        assert(testNewTweet(), "Check new tweet");
        assert(testEmptyTweet(), "Check empty tweet");
    });

    test_group("Selectors", function () {
        assert(oneImageLogo(), "Counting one image logo class element");
        assert(threeTweets(), "Counting 3 row tweets class under tweets class");
    });
};

var showTweets = function (tweets) {
    for (var index = 0; index < tweets.length; index++) {
        createTweetHTML(tweets[index].username, tweets[index].text, "green");
    }
};

var createTweetHTML = function (userName, tweetContent, color) {
    var headDiv = document.getElementById("tweets");
    var rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    var userAvatarDiv = document.createElement("div");
    userAvatarDiv.classList.add("user-avatar");
    var avatarImg = document.createElement("img");
    avatarImg.setAttribute("src", "images/useravatar.png");
    avatarImg.setAttribute("alt", "User Avatar");
    var userNameDiv = document.createElement("div");
    userNameDiv.classList.add("user-name");
    userNameDiv.setAttribute("style", "color: " + color);
    var tweetP = document.createElement("p");

    userNameDiv.innerHTML = userName;
    tweetP.innerHTML = tweetContent;

    headDiv.appendChild(rowDiv);
    rowDiv.appendChild(userAvatarDiv);
    userAvatarDiv.appendChild(avatarImg);
    rowDiv.appendChild(userNameDiv);
    rowDiv.appendChild(tweetP);
};

var createNewTweet = function () {
    var newTweet = {
        username: 'Sagie',
        text: document.getElementById("tweetContent").value.replace(/[<]/g,'&lt').replace(/[>]/g,'&gt')
    };

    if (validateTweet(newTweet.text)) {
        tweets.push(newTweet);
        document.getElementById("tweetContent").value = "";
        createTweetHTML(newTweet.username, newTweet.text, "black");
    }
};

var validateTweet = function (tweetContent) {
    return tweetContent != null && tweetContent != undefined && tweetContent != "";

};

// -------------TESTING------------------------------------------------------------------
var testNewTweet = function () {
    var input = document.getElementById("tweetContent");
    input.value = "testing";
    createNewTweet();
    var originTweets = tweets.filter(function (item) {return item.text != "testing"});
    var isWork = originTweets.length != tweets.length;
    tweets = originTweets;
    document.getElementById("tweets").lastElementChild.remove();
    return isWork;
};

var testEmptyTweet = function () {
    var input = document.getElementById("tweetContent");
    input.value = "";
    createNewTweet();
    var newTweets = tweets.filter(function (item) {return item.text != ""});
    var isWork = newTweets.length === tweets.length;
    tweets = newTweets;
    return isWork;
};

var oneImageLogo = function () {
    return document.querySelectorAll(".image-logo").length === 1;
};

var threeTweets = function () {
  return document.querySelectorAll("#tweets .row").length === 3;
};
// ---------------------------------------------------------------------------------------------

document.getElementById("publishBtn").addEventListener("click", createNewTweet);