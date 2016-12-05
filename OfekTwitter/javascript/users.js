var users = [
    {username: 'Bobo', follow: false},
    {username: 'Elvis', follow: true},
    {username: 'Mimi', follow: false}
];

window.addEventListener("load", function () {
    showUsers(users);
});

var showUsers = function (users) {
    for (var index = 0; index < users.length; index++) {
        buildUser(users[index]);
    }
};

var buildUser = function (user) {
    var headDiv = $("#usersContainer");
    var colDiv = document.createElement("div");
    colDiv.classList.add("col-md-2");
    colDiv.classList.add(user.username);

    if (user.follow) {
        buildFollowe(user);
    }

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
       if (!users[index].username.includes(filterText)) {
           $("." + users[index].username).addClass("hidden");
       } else {
           $("." + users[index].username).removeClass("hidden");
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