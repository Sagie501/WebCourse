var myId = "5e07631e-3974-47f8-a89c-bb41ce1e0e3d";

var users = [];

window.addEventListener("load", function () {
    showUsers();
});

var showUsers = function () {
    var userFollowing = [];
    axios.get("http://10.103.50.249:8000/users/" + myId)
        .then(function (response) {
            userFollowing = response.data[0].following;
        })
        .then(function () {
            axios.get('http://10.103.50.249:8000/users')
                .then(function (response) {
                    users = response.data;
                    for (var index = 0; index < users.length; index++) {
                        if (users[index]._id !== myId) {
                            if (userFollowing.indexOf(users[index]._id) > -1) {
                                users[index].follow = true;
                            } else {
                                users[index].follow = false;
                            }
                            buildUser(users[index]);
                        } else {
                            var usersFollowingPromise = [];
                            var usersFollowing = [];
                            for (var index2 = 0; index2 < users[index].following.length; index2++) {
                                usersFollowingPromise.push(axios.get("http://10.103.50.249:8000/users/" + users[index].following[index2])
                                    .then(function (response) {
                                        usersFollowing.push(response.data[0]);
                                    }));
                            }
                            axios.all(usersFollowingPromise).then(function () {
                                for (specUser of usersFollowing) {
                                    specUser.follow = true;
                                    buildFollowe(specUser);
                                }
                            });
                        }
                    }
                });
        });
};

var buildUser = function (user) {
    var headDiv = $("#usersContainer");
    var colDiv = document.createElement("div");
    colDiv.classList.add("col-md-2");
    colDiv.classList.add(user.username);

    headDiv.result[0].appendChild(colDiv);
    colDiv.appendChild(build(user));
};

var buildFollowe = function (user) {
    var headDiv = $("#following");
    var colDiv = document.createElement("div");
    colDiv.classList.add("col-md-12");
    colDiv.classList.add(user.username);

    headDiv.result[0].appendChild(colDiv);
    colDiv.appendChild(build(user));
};

var build = function (user) {
    var thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail");
    var avatarImg = document.createElement("img");
    avatarImg.setAttribute("src", "images/useravatar.png");
    avatarImg.setAttribute("alt", "User Avatar");
    var caption = document.createElement("div");
    caption.classList.add("caption");
    var buttonP = document.createElement("p");
    var input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("id", "btn_" + user.username);
    if (!user.follow) {
        input.setAttribute("value", "follow");
        input.classList.add("btn");
        input.classList.add("btn-success");
    } else {
        input.setAttribute("value", "unfollow");
        input.classList.add("btn");
        input.classList.add("btn-danger");
    }
    input.addEventListener("click", function() {
        btnClicked(this, user);
    });
    var usernameP = document.createElement("p");

    usernameP.innerHTML = user.username;

    thumbnail.appendChild(avatarImg);
    thumbnail.appendChild(caption);
    caption.appendChild(buttonP);
    buttonP.appendChild(input);
    caption.appendChild(usernameP);

    return thumbnail;
};

var btnClicked = function (btn, user) {
    if (!user.follow) {
        followClicked(btn);
        user.follow = !user.follow;
        addToFollowesList(user);
    } else {
        unfollowClicked(document.getElementById("btn_" + user.username));
        user.follow = !user.follow;
        removeFromList(user.username);
    }
};

var followClicked = function (btn) {
    btn.setAttribute("value", "unfollow");
    btn.classList.remove("btn-success");
    btn.classList.add("btn-danger");
};

var unfollowClicked = function (btn) {
    btn.setAttribute("value", "follow");
    btn.classList.remove("btn-danger");
    btn.classList.add("btn-success");
};

var addToFollowesList = function(user) {
    buildFollowe(user);
};

var removeFromList = function (userName) {
    $("." + userName).result[1].remove();
};

$("#filterText").result[0].addEventListener("keyup", function () {
   var filterText =  $("#filterText").result[0].value;
   for (var index = 0; index < users.length; index++) {
       if (users[index]._id !== myId) {
           if (!users[index].username.includes(filterText)) {
               $("." + users[index].username).result[0].classList.add("hidden");
           } else {
               $("." + users[index].username).result[0].classList.remove("hidden");
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