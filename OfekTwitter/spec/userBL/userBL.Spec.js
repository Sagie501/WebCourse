describe("userBL", function () {
    var userBL = require('../../userBL');
    beforeAll(function (done) {
        userBL.getAllUsers().then(done);
    });

    describe("Should get a user by ID", function () {
        it("should return the user if the id is valid", function () {
            var validUserId = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";

            var result = userBL.userById(validUserId);

            expect(result).not.toBe(undefined);
        });

        it("should return undefined if id is not valid", function () {
            var invalidUserId = "Fake ID";

            var result = userBL.userById(invalidUserId);

            expect(result).toBe(undefined);
        });
    });

    describe("Should get users array that follow after the id", function () {
        it("should return the users array if the user is being followed", function () {
            var validUserId = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";

            var result = userBL.getUsersFollowId(validUserId);

            expect(result).not.toBe(undefined);
        });

        it("should return empty array if the user isn't being followed", function () {
            var userIdThatNotFollowed = "ijo9l2cm-56g0-qbur-21cw-ch4oufkqyzjc";

            var result = userBL.getUsersFollowId(userIdThatNotFollowed);

            expect(result.length).toBe(0);
        });
    });

    describe("Should get user by username and password", function () {
        it("should return the user", function () {
            var validUsername = "Sagie";
            var validPassword = "123";

            var result = userBL.findUserNameByUsernameAndPassword(validUsername, validPassword);

            expect(result).not.toBe(null);
        });

        it("should return null if the user isn't exist", function () {
            var invalidUsername = "fake";
            var invalidPassword = "user";

            var result = userBL.findUserNameByUsernameAndPassword(invalidUsername, invalidPassword);

            expect(result).toBe(null);
        });
    });

    describe("Should return true if the user is exist or false if not", function () {
        it("should return true if the user exist", function () {
            var validUsername = "Sagie";
            var validPassword = "123";

            var result = userBL.checkUserInUsers(validUsername, validPassword);

            expect(result).toBe(true);
        });

        it("should return false if the user isn't exist", function () {
            var invalidUsername = "fake";
            var invalidPassword = "user";

            var result = userBL.checkUserInUsers(invalidUsername, invalidPassword);

            expect(result).toBe(false);
        });
    });
});