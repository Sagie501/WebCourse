$("#signUpBtn").click(function () {
   let username = $("#username");
   let password = $("#password");
   let confirmPassword = $("#confirmPassword");
   if (validteInput(username.val(), password.val(), confirmPassword.val())) {
       createNewUserPromise({username: username.val(), password: password.val(), confirmPassword: confirmPassword.val()}).then(function (response) {
           if (response.data.result == true) {
               alert("Your User has been created!");
               window.location = "index.html";
           } else {
               alert("Passwords don't equal try again!");
               password.val("");
               confirmPassword.val("");
           }
       });
   } else {
       if (username.val() === "") {
           username.tooltip('show');
           password.tooltip('hide');
           confirmPassword.tooltip('hide');
       } else if (password.val() === "") {
           password.tooltip('show');
           username.tooltip('hide');
           confirmPassword.tooltip('hide');
       }else if (confirmPassword.val() === "") {
           confirmPassword.tooltip('show');
           username.tooltip('hide');
           password.tooltip('hide');
       }
   }
});

let validteInput = function(username, password, confirmPassword) {
    return username !== "" && password !== "" && confirmPassword !== "";
};