var users = [
    {username: 'Bobo', follow: false},
    {username: 'Elvis', follow: true},
    {username: 'Mimi', follow: false}
];

window.onload = function () {
    showUsers(users);
}

var showUsers = function (users) {
    for (var index = 0; index < users.length; index++) {
        buildUser(users[index]);
    }
}

var buildUser = function (user) {
    var headDiv = document.getElementById("usersContainer");
    var colDiv = document.createElement("div");
    colDiv.classList.add("col-md-2");
    colDiv.classList.add(user.username);
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
        buildFollowe(user);
    }
    input.addEventListener("click", function() {
        if (!user.follow) {
            followClicked(this);
            addToList(user);
        } else {
            unfollowClicked(this);
            removeFromList(user.username);
        }
        user.follow = !user.follow;
    });
    var usernameP = document.createElement("p");

    usernameP.innerHTML = user.username;

    headDiv.appendChild(colDiv);
    colDiv.appendChild(thumbnail);
    thumbnail.appendChild(avatarImg);
    thumbnail.appendChild(caption);
    caption.appendChild(buttonP);
    buttonP.appendChild(input);
    caption.appendChild(usernameP);
}

var buildFollowe = function (user) {
    var headDiv = document.getElementById("following");
    var colDiv = document.createElement("div");
    colDiv.classList.add("col-md-12");
    colDiv.classList.add(user.username);
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
    input.setAttribute("value", "unfollow");
    input.classList.add("btn");
    input.classList.add("btn-danger");
    input.addEventListener("click", function() {
        removeFromList(user.username);
        user.follow = !user.follow;
        unfollowClicked(document.getElementById("btn_" + user.username));
    });
    var usernameP = document.createElement("p");

    usernameP.innerHTML = user.username;

    headDiv.appendChild(colDiv);
    colDiv.appendChild(thumbnail);
    thumbnail.appendChild(avatarImg);
    thumbnail.appendChild(caption);
    caption.appendChild(buttonP);
    buttonP.appendChild(input);
    caption.appendChild(usernameP);
}

var followClicked = function (btn) {
    btn.setAttribute("value", "unfollow");
    btn.classList.remove("btn-success");
    btn.classList.add("btn-danger");
}

var unfollowClicked = function (btn) {
    btn.setAttribute("value", "follow");
    btn.classList.remove("btn-danger");
    btn.classList.add("btn-success");
}

var addToList = function(user) {
    buildFollowe(user);
}

var removeFromList = function (userName) {
    document.getElementsByClassName(userName)[1].remove();
}

document.getElementById("okButton").addEventListener("click", function () {
   var filterText =  document.getElementById("filterText");
   for (var index = 0; index < users.length; index++) {
       if (!users[index].username.includes(filterText)) {
           document.getElementsByClassName(users[index].username)[0].classList.add("hidden");
       } else {
           document.getElementsByClassName(users[index].username)[0].classList.remove("hidden");
       }
   }
});