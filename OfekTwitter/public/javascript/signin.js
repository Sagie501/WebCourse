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
                swal({
                    title: 'Welcome back ' + username.val() + "!",
                    type: 'success',
                    timer: 1500
                });
                setTimeout(function(){
                    username.val("");
                    password.val("");
                    window.location = "/";
                }, 1500);
            }).catch(function () {
                swal({
                    title: "Womething went wrong",
                    text: "Username or password not valid. Please try again.",
                    type: 'error'
                });
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