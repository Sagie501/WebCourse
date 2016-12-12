describe("userBL", function () {
    var userBL = require('../../userBL');
    beforeAll(function (done) {

    });

    describe("Should get a user by ID", function () {
        it("should return the user if the id is valid", function (done) {
            var validUserId = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";

            var result = userBL.userById(validUserId);

            expect(result).not.toBe(undefined);
            done();
        });

        it("should return undefined if id is not valid", function (done) {
            var invalidUserId = "Fake ID";

            var result = userBL.userById(invalidUserId);

            expect(result).toBe(undefined);
        });
    });

    describe("Should get users array that follow id", function () {
        it("should return the users array if the user is being followed", function () {
            var validUserId = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";

            var result = userBL.getUsersFollowId(validUserId);

            expect(result).not.toBe(undefined);
        });

        it("should return undefined if id is not valid", function (done) {
            var userIdThatNotFollowed = "d71efu6v-2gca-tzpz-jrdv-jueutcir2h09";

            var result = userBL.getUsersFollowId(userIdThatNotFollowed);

            expect(result).toBe(undefined);
        });
    });

    describe("Should get users array that follow id", function () {
        it("should return the users array if the user is being followed", function () {
            var validUserId = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";

            var result = userBL.getUsersFollowId(validUserId);

            expect(result).not.toBe(undefined);
        });

        it("should return undefined if id is not valid", function (done) {
            var userIdThatNotFollowed = "d71efu6v-2gca-tzpz-jrdv-jueutcir2h09";

            var result = userBL.getUsersFollowId(userIdThatNotFollowed);

            expect(result).toBe(undefined);
        });
    });

    describe("Should get user by username and password", function () {
        it("should return the user", function () {
            var validUsername = "Sagie";
            var validPasswrod = "123";

            var result = userBL.findUserNameByUsernameAndPassword(validUsername, validPasswrod);

            expect(result).not.toBe(undefined);
        });

        it("should return undefined if the user isn't exist", function (done) {
            var invalidUsername = "fake";
            var invalidPasswrod = "user";

            var result = userBL.findUserNameByUsernameAndPassword(invalidUsername, invalidPasswrod);

            expect(result).toBe(undefined);
        });
    });

    describe("Should return true if the user is exist", function () {
        it("should return true if the user is being followed", function () {
            var validUsername = "Sagie";
            var validPasswrod = "123";

            var result = userBL.checkUserInUsers(validUsername, validPasswrod);

            expect(result).toBe(true);
        });

        it("should return false if id is not valid", function (done) {
            var invalidUsername = "fake";
            var invalidPasswrod = "user";

            var result = userBL.checkUserInUsers(invalidUsername, invalidPasswrod);

            expect(result).toBe(false);
        });
    });
});