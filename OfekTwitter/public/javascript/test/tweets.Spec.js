describe("validateTweet" ,function () {
    it('should return true for good content', function () {
        // Arrange
        var content = "Testing";

        // Act
        var result = validateTweet(content);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false for undefined', function () {
        // Arrange
        var content = undefined;

        // Act
        var result = validateTweet(content);

        // Assert
        expect(result).toBe(false);
    });
});