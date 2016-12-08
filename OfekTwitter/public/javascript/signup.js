$("#signUpBtn").click(function () {
   let username = $("#username");
   let password = $("#password");
   let confirmPassword = $("#confirmPassword");
    tooltipSettings(username, password, confirmPassword);

   if (validteInput(username.val(), password.val(), confirmPassword.val())) {
       createNewUserPromise({username: username.val(), password: password.val(), confirmPassword: confirmPassword.val()}).then(function (response) {
           if (response.data.result == true) {
               alert("Your User has been created!");
               // TODO: Set the session to the user that created
               window.location = "index.html";
           } else {
               alert("Passwords don't equal try again!");
               password.val("");
               confirmPassword.val("");
           }
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