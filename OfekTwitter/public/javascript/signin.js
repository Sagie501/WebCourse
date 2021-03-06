$('#signInBtn').click(function () {
    let username = $('#username');
    let password = $('#password');
    tooltipSettings(username, password);

    if (validateUser(username, password)) {
        getAllUsersPromise().then(function () {
            loginToUserPromise({username: username.val(), password: password.val()}).then(function (res) {
                swal({
                    title: 'Welcome back ' + username.val() + "!",
                    text: 'Start tweet with your friends!',
                    type: 'success',
                    timer: 2000
                });
                setTimeout(function(){
                    username.val("");
                    password.val("");
                    window.location = "/";
                }, 2000);
            }).catch(function () {
                swal({
                    title: "Something went wrong!",
                    text: "Username or password not valid. Please try again.",
                    type: 'error'
                });
                password.val("");
            });
        });
    } else {
        tooltipHandler(username, password);
    }
});

function validateUser(username, password) {
    return username.val() !== "" && password.val() !== "";
}

function tooltipSettings(username, password) {
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
}

function tooltipHandler(username, password) {
    if (username.val() === "") {
        username.tooltip('show');
        password.tooltip('hide');
    } else if (password.val() === "") {
        password.tooltip('show');
        username.tooltip('hide');
    }
}

// describe("validateUser" ,function () {
//     it('should return true for good content', function () {
//         // Arrange
//         var username = "Testing";
//         var password = "123";
//
//         // Act
//         var result = validateUser(username, password);
//
//         // Assert
//         expect(result).toBe(true);
//     });
//
//     it('should return false for empty username', function () {
//         // Arrange
//         var username = "";
//         var password = "123";
//
//         // Act
//         var result = validateUser(username, password);
//
//         // Assert
//         expect(result).toBe(false);
//     });
// });