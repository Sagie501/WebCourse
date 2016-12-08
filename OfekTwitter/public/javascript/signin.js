$('#signInBtn').result[0].addEventListener('click', function () {
    let username = $('#username').result[0];
    let password = $('#password').result[0];

    if (username !== "" && password !== "") {
        loginToUserPromise({username: username.value, password: password.value}).then(function (res) {
                let result = res.data.result;

                if (result) {
                    sessionUserId = res.data.userId;
                    sessionUser = res.data;
                    // TODO need to work with the session
                    alert("Welcome back " + username.value + "!");
                    window.location = "index.html";
                } else {
                    alert("Username or password not valid.");
                    password.value = "";
                }
            });
    } else {
        alert("Not all input forms filled.");
    }
});