let myId = "";


let users = [];

window.addEventListener("load", function () {
    getSessionPromise().then(function (response) {
        myId = response.data[0]._id;
        showUsers();
    }).catch(function () {
        window.location = "/signIn";
    });

    $("#logout").result[0].addEventListener("click", function () {
        logoutPromise();
    });
});

let showUsers = function () {
    let userFollowing = [];
    getUsersByIdPromise(myId).then(function (response) {
        userFollowing = response.data[0].following;
    }).then(function () {
        getAllUsersPromise().then(function (response) {
            users = response.data;
            for (let i = 0; i < users.length; i++) {
                if (users[i]._id !== myId) {
                    if (userFollowing.includes(users[i]._id)) {
                        users[i].follow = true;
                        buildFollowe(users[i]);
                    } else {
                        users[i].follow = false;
                    }
                    buildUser(users[i]);
                }
            }
        })
    });
    /*axios.get("http://localhost:8000/users/" + myId)
     .then(function (response) {
     userFollowing = response.data[0].following;
     })
     .then(function () {
     axios.get('http://localhost:8000/users')
     .then(function (response) {
     users = response.data;
     for (let index = 0; index < users.length; index++) {
     if (users[index]._id !== myId) {
     if (userFollowing.includes(users[index]._id)) {
     users[index].follow = true;
     buildFollowe(users[index]);
     } else {
     users[index].follow = false;
     }
     buildUser(users[index]);
     }
     }
     });
     });*/
};

let buildUser = function (user) {
    let usersContainerElement = $("#usersContainer");
    let specificUserContainer = document.createElement("div");
    specificUserContainer.classList.add("col-md-2");
    specificUserContainer.classList.add(user.username);

    usersContainerElement.result[0].appendChild(specificUserContainer);
    specificUserContainer.appendChild(build(user));
};

let buildFollowe = function (user) {
    let headDiv = $("#following");
    let colDiv = document.createElement("div");
    colDiv.classList.add("col-md-12");
    colDiv.classList.add(user.username);

    headDiv.result[0].appendChild(colDiv);
    colDiv.appendChild(build(user));
};

let build = function (user) {
    let thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail");
    let avatarImg = document.createElement("img");
    avatarImg.setAttribute("src", "images/useravatar.png");
    avatarImg.setAttribute("alt", "User Avatar");
    let caption = document.createElement("div");
    caption.classList.add("caption");
    let buttonP = document.createElement("p");
    let input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("id", "btn_" + user._id);
    if (!user.follow) {
        input.setAttribute("value", "follow");
        input.classList.add("btn");
        input.classList.add("btn-success");
    } else {
        input.setAttribute("value", "unfollow");
        input.classList.add("btn");
        input.classList.add("btn-danger");
    }
    input.addEventListener("click", function () {
        btnClicked(this, user);
    });
    let usernameP = document.createElement("p");

    usernameP.innerHTML = user.username;

    thumbnail.appendChild(avatarImg);
    thumbnail.appendChild(caption);
    caption.appendChild(buttonP);
    buttonP.appendChild(input);
    caption.appendChild(usernameP);

    return thumbnail;
};

let btnClicked = function (btn, user) {
    addOrRemoveFollowerPromise({userId: myId, userIdToAddOrRemove: user._id}).then(function () {
        if (!user.follow) {
            followClicked(btn);
            user.follow = !user.follow;
            addToFollowesList(user);
        } else {
            unfollowClicked(document.getElementById("btn_" + user._id));
            user.follow = !user.follow;
            removeFromList(user.username);
        }
    });
    /*axios.put("http://localhost:8000/users/following", {userId: myId, userIdToAddOrRemove: user._id})
     .then(function () {
     if (!user.follow) {
     followClicked(btn);
     user.follow = !user.follow;
     addToFollowesList(user);
     } else {
     unfollowClicked(document.getElementById("btn_" + user.username));
     user.follow = !user.follow;
     removeFromList(user.username);
     }
     });*/
};

let followClicked = function (btn) {
    btn.setAttribute("value", "unfollow");
    btn.classList.remove("btn-success");
    btn.classList.add("btn-danger");
};

let unfollowClicked = function (btn) {
    btn.setAttribute("value", "follow");
    btn.classList.remove("btn-danger");
    btn.classList.add("btn-success");
};

let addToFollowesList = function (user) {
    buildFollowe(user);
};

let removeFromList = function (userName) {
    $("." + userName).result[1].remove();
};

$("#filterText").result[0].addEventListener("keyup", function () {
    let filterText = $("#filterText").result[0].value;
    for (let index = 0; index < users.length; index++) {
        if (users[index]._id !== myId) {
            if (!users[index].username.includes(filterText)) {
                $("." + users[index]._id).result[0].classList.add("hidden");
            } else {
                $("." + users[index]._id).result[0].classList.remove("hidden");
            }
        }
    }

});

/*var testFollowClicked = function () {
 var input = document.getElementById("btn_" + users[0].username);
 var originFollow = users[0].follow;
 btnClicked(input, users[0]);
 var isWork = originFollow != users[0].follow;
 btnClicked(input, users[0]);
 return isWork;
 };

 test_group("Checking following", function () {
 assert(testFollowClicked, "Check follow or unfollow user");
 });*/