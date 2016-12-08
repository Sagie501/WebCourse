$('#signInBtn').click(function () {
    let username = $('#username');
    let password = $('#password');
    username.tooltip({
        trigger: 'manual'
    });

    password.tooltip({
        trigger: 'manual'
    });

    username.focus(function () {
        username.tooltip('hide');
    });

    password.focus(function () {
        password.tooltip('hide');
    });

    if (validateUser(username, password)) {
        loginToUserPromise({username: username.val(), password: password.val()}).then(function (res) {
                    sessionUser = res.data.sessionuser;
                    alert("Welcome back " + username.value + "!");
                    username.val("");
                    password.val("");
                    window.location = "/";
            }).catch(function () {
                alert("Username or password not valid.");
                password.val("");
            });
    } else {
        if (username.val() === "") {
            username.tooltip('show');
            password.tooltip('hide');
        } else if (password.val() === "") {
            password.tooltip('show');
            username.tooltip('hide');
        }
    }
});

function validateUser(username, password) {
    return username.val() !== "" && password.val() !== "";
}