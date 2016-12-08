const PORT = 8000;
const ip = "http://10.103.50.249";
const address = ip + ":" + PORT;

var getAllUsersPromise = function () {
    return axios.get(address + "/users");
};

var getUsersByIdPromise = function (id) {
    return axios.get(address + "/users/" +id);
};

var getUsersFollowIdPromise = function (id) {
    return axios.get(address + "/users/following/" + id);
};

var getAllTweetsPromise = function () {
    return axios.get(address + "/tweets");
};

var getTweetsBtIdPromise = function (id) {
    return axios.get(address + "/tweets/ " + id);
};

var putNewTweetPromise = function (newTweet) {
    return axios.put(address + "/tweets", newTweet);
};

var addOrRemoveFollowerPromise = function (addRemoveObject) {
    return axios.put(address + "/users/following", addRemoveObject);
};

var createNewUserPromise = function (user) {
    return axios.post(address + "/users", user);
};

var loginToUserPromise = function (user) {
  return axios.put(address + "/login", user);
};

var getSessionPromise = function () {
    return axios.get(address + "/session");
};