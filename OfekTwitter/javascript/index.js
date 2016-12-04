var tweets = [
    {username: 'Bobo', text: 'hello followers!'},
    {username: 'Elvis', text: 'this exercise is really easy!'},
    {username: 'Mimi', text: 'I want to go to sleep'}
];

window.onload = function () {
    showTweets(tweets);
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

test_group("Stam test group", function () {
    assert(true, "first test");
    assert(false, "second test");
    assert(true, "third test");
});

test_group("dsf test group", function () {
    assert(true, "gfd test");
    assert(false, "gfd test");
    assert(true, "gfd test");
});

document.getElementById("publishBtn").addEventListener("click", function () {
    var newTweet = {
        username: 'Sagie',
        text: document.getElementById("tweetContent").value.replace(/[<]/g,'&lt').replace(/[>]/g,'&gt')
    };

    if (validateTweet(newTweet.text)) {
        tweets.push(newTweet);
        document.getElementById("tweetContent").value = "";
        createTweetHTML(newTweet.username, newTweet.text, "black");
    }
});

var validateTweet = function (tweetContent) {
    return tweetContent != null && tweetContent != undefined && tweetContent != "";

};