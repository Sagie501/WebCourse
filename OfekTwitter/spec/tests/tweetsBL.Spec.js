describe("tweetsBL", function () {
    var tweestBL = require('../../tweetsBL');
    beforeAll(function (done) {
        tweestBL.getAllTweets().then(done);
    });

    describe("Should get a tweets by user ID", function () {
        it("should return the user's tweets", function () {
            var validUserId = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";

            var result = tweestBL.getTweetsById(validUserId);

            expect(result.length).toBeGreaterThan(0);
        });

        it("should return empty array", function () {
            var invalidUserId = "Fake ID";

            var result = tweestBL.getTweetsById(invalidUserId);

            expect(result.length).toBe(0);
        });
    });
});