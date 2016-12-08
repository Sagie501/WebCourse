$("#signUpBtn").click(function () {
    let username = $("#username");
   let password = $("#password");
   let confirmPassword = $("#confirmPassword");
    tooltipSettings(username, password, confirmPassword);

   if (validteInput(username.val(), password.val(), confirmPassword.val())) {
       createNewUserPromise({username: username.val(), password: password.val(), confirmPassword: confirmPassword.val()}).then(function (response) {
           swal({
               title: 'Your user has been created!',
               type: 'success',
               timer: 1500
           });
           setTimeout(function(){
               loginToNewUser(username, password, confirmPassword);
           }, 1500);
       }).catch(function () {
           swal({
               title: "Something went wrong",
               text: "Passwords doesn't equal try again!",
               type: 'error'
           });
           password.val("");
           confirmPassword.val("");
       });
   } else {
       tooltipHandler(username, password, confirmPassword);
   }
});

let validteInput = function(username, password, confirmPassword) {
    return username !== "" && password !== "" && confirmPassword !== "";
};

function tooltipSettings(username, password, confirmPassword) {
    username.tooltip({
        trigger: 'manual'
    });

    password.tooltip({
        trigger: 'manual'
    });

    confirmPassword.tooltip({
        trigger: 'manual'
    });

    username.focus(function () {
        username.tooltip('hide');
    });

    password.focus(function () {
        password.tooltip('hide');
    });

    confirmPassword.focus(function () {
        confirmPassword.tooltip('hide');
    });
}

function tooltipHandler(username, password, confirmPassword) {
    if (username.val() === "") {
        username.tooltip('show');
        password.tooltip('hide');
        confirmPassword.tooltip('hide');
    } else if (password.val() === "") {
        password.tooltip('show');
        username.tooltip('hide');
        confirmPassword.tooltip('hide');
    } else if (confirmPassword.val() === "") {
        confirmPassword.tooltip('show');
        username.tooltip('hide');
        password.tooltip('hide');
    }
}

function loginToNewUser(username, password, confirmPassword) {
    loginToUserPromise({username: username.val(), password: password.val()}).then(function (res) {
        username.val("");
        password.val("");
        confirmPassword.val("");
        window.location = "/";
    });
}