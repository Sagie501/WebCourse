const PORT = 8000;
const ip = "http://10.103.50.249";
const address = ip + PORT;

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

var putNewTweetsPromise = function () {
    return axios.put(address + "/tweets");
};

var addOrRemoveFollowerPromise = function () {
    return axios.put(address + "/users/following");
};