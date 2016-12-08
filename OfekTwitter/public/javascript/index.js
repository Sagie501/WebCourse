let tweets = [];

let myId = "5e07631e-3974-47f8-a89c-bb41ce1e0e3d";

window.addEventListener("load", function () {
    showTweets(tweets);

    /*test_group("Checking publishing", function () {
        assert(testNewTweet(), "Check new tweet");
        assert(testEmptyTweet(), "Check empty tweet");
    });

    test_group("Selectors", function () {
        assert(oneImageLogo(), "Counting one image logo class element");
        assert(threeTweets(), "Counting 3 tweet-row classes under tweets class");
    });

    test_group("CSS functions", function () {
        var tweetUsername = $(".user-name");
        tweetUsername.css("color: green");
        assert($(".user-name").result[0].style.cssText === "color: green;", "css() sets welcome-header to green");
        tweetUsername.addClass("papa");
        assert($(".user-name").result[0].classList.contains("papa"), "addClass() adds papa class");
        tweetUsername.removeClass("papa");
        assert($(".user-name").result[0].classList.contains("papa") === false, "removeClass() adds papa class")
    });

    test_group("Functional functions tests", function () {
        var navbar = $(".navbar-nav li");
        assert(navbar.any(function (element) {
                return element.childElementCount === 0
            }) === false, "any function doesn't find a nav-btn class element with no children");
    });*/

    $("#publishBtn").result[0].addEventListener("click", createNewTweet);
});

let showTweets = function (tweets) {
    let usernamePromises = [];
    let userFollowing = [];
    getUsersByIdPromise(myId).then(function (response) {
        userFollowing = response.data[0].following;
    }).then(function () {
        getAllTweetsPromise().then(function (response) {
            tweets = response.data;
        }).then(function () {
            tweets.forEach(function (tweet) {
                usernamePromises.push(getUsersByIdPromise(tweet.user).then(function (response) {
                    tweet.username = response.data[0].username;
                }));
            });
        }).then(function () {
            axios.all(usernamePromises).then(function () {
                tweets.forEach(function (tweet) {
                    if (userFollowing.includes(tweet.user) || tweet.user == myId) {
                        createTweetHTML(tweet.username, tweet.text, "green");
                    }
                })
            });
        })
    });
    /*axios.get("http://localhost:8000/users/" + myId)
        .then(function (response) {
            userFollowing = response.data[0].following;
        }).then(function () {
        axios.get('http://localhost:8000/tweets')
            .then(function (response) {
                tweets = response.data;
            }).then(function () {
            tweets.forEach(function (tweet) {
                usernamePromises.push(axios.get('http://localhost:8000/users/' + tweet.user).then(function (response) {
                    tweet.username = response.data[0].username;
                }))
            });
        }).then(function () {
            axios.all(usernamePromises).then(function () {
                tweets.forEach(function (tweet) {
                    if (userFollowing.includes(tweet.user) || tweet.user == myId) {
                        createTweetHTML(tweet.username, tweet.text, "green");
                    }
                })
            });
        });
    });*/
};

let createTweetHTML = function (userName, tweetContent, color) {
    let headDiv = $("#tweets");
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    let userAvatarDiv = document.createElement("div");
    userAvatarDiv.classList.add("user-avatar");
    let avatarImg = document.createElement("img");
    avatarImg.setAttribute("src", "images/useravatar.png");
    avatarImg.setAttribute("alt", "User Avatar");
    let userNameDiv = document.createElement("div");
    userNameDiv.classList.add("user-name");
    userNameDiv.setAttribute("style", "color: " + color);
    let tweetP = document.createElement("p");

    userNameDiv.innerHTML = userName + " says:";
    tweetP.innerHTML = tweetContent;

    headDiv.result[0].appendChild(rowDiv);
    rowDiv.appendChild(userAvatarDiv);
    userAvatarDiv.appendChild(avatarImg);
    rowDiv.appendChild(userNameDiv);
    rowDiv.appendChild(tweetP);
};

let createNewTweet = function () {
    let tweetText = $("#tweetContent").result[0].value.replace(/[<]/g,'&lt').replace(/[>]/g,'&gt');

    if (validateTweet(tweetText)) {
        getUsersByIdPromise(myId).then(function (response) {
            let username = response.data[0].username;
            let newTweet = {
                username: myId,
                text: tweetText
            };
            putNewTweetPromise(newTweet).then(function () {
                tweets.push(newTweet);
                $("#tweetContent").result[0].value = "";
                createTweetHTML(username, newTweet.text, "black");
            });
        });
        /*axios.get("http://localhost:8000/users/" + myId)
            .then(function (response) {
                let username = response.data[0].username;
                let newTweet = {
                    username: myId,
                    text: tweetText
                };
                axios.put("http://localhost:8000/tweets", newTweet)
                    .then(function (response) {
                        tweets.push(newTweet);
                        $("#tweetContent").result[0].value = "";
                        createTweetHTML(username, newTweet.text, "black");
                    });
            });*/
    }
};

let validateTweet = function (tweetContent) {
    return tweetContent != null && tweetContent != undefined && tweetContent != "";
};

// -------------TESTING------------------------------------------------------------------
// Testing here because it makes problem with the listener
let testNewTweet = function () {
    let input = $("#tweetContent");
    input.result[0].value = "testing";
    createNewTweet();
    let originTweets = tweets.filter(function (item) {return item.text != "testing"});
    let isWork = originTweets.length != tweets.length;
    tweets = originTweets;
    $("#tweets").result[0].lastElementChild.remove();
    return isWork;
};

let testEmptyTweet = function () {
    let input = $("#tweetContent");
    input.result[0].value = "";
    createNewTweet();
    let newTweets = tweets.filter(function (item) {return item.text != ""});
    let isWork = newTweets.length === tweets.length;
    tweets = newTweets;
    return isWork;
};

let oneImageLogo = function () {
    return $(".image-logo").count() === 1;
};

let threeTweets = function () {
    return $("#tweets .row").count() === 3;
};

// ---------------------------------------------------------------------------------------------