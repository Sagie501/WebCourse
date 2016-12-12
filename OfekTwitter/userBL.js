var dataReader = require('./dataReader');
var users = [];

// function loadUsers () {
//     return new Promise(function (resolve) {
//         dataReader.users().then(function (response) {
//             users = response;
//             resolve(users);
//         })
//     });
// }

function getUserById (id) {
    var userArr = [];

    for (user of users) {
        if (user._id === id) {
            userArr.push(user);
            return userArr;
        }
    }
}

function getUsersFollowId(id) {
    let usersFollowId = [];
    for (user of users) {
        if (user.following.includes(id)) {
            usersFollowId.push(user);
        }
    }
    return usersFollowId;
}

function addOrRemoveFollower(userId, userIdToAddOrRemove) {
    let user = getUserById(userId)[0];
    if (user.following.includes(userIdToAddOrRemove)) {
        let index = user.following.indexOf(userIdToAddOrRemove);
        user.following.splice(index, 1);
    } else {
        user.following.push(userIdToAddOrRemove);
    }
    return users;
}

function getAllUsers() {
    return new Promise(function (resolve) {
        dataReader.users().then(function (response) {
            users = response;
            resolve(users);
        })
    });
}

function findUserNameByUsernameAndPassword(username, password) {
    for (user of users) {
        if (user.username.toLowerCase() === username.toLowerCase() && user.password === password) {
            return {_id: user._id, username: user.username, following: user.following};
        }
    }
    return null;
}

function checkUserInUsers(username, password) {
    return findUserNameByUsernameAndPassword(username, password) != null;
}

function addUser(username, passeword) {
    users.push({_id: generateValidId(users), username: username, password: passeword, following: []});
    return users;
}

function validPassword(username, password) {
    for (user of users) {
        if (username == user.username && password === user.password) {
            return false;
        }
    }
    return true;
}

function generateValidId(users) {
    let newId = "";

    do {
        newId = generateID();
    } while(!validId(users, newId));

    return newId;
}

function generateID() {
    return generateRandomString(8) + '-' + generateRandomString(4) + '-' + generateRandomString(4) + '-' +
        generateRandomString(4) + '-' + generateRandomString(12);
}

function generateRandomString(length) {
    let mask = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let index = 0; index < length; index++) {
        result += mask[Math.floor(Math.random() * mask.length)];
    }

    return result;
}

function validId(users, id) {
    for (user of users) {
        if (user._id === id) {
            return false;
        }
    }
    return true;
}

module.exports = {
    userById: getUserById,
    getUsersFollowId: getUsersFollowId,
    addOrRemoveFollower: addOrRemoveFollower,
    getAllUsers: getAllUsers,
    addUser: addUser,
    findUserNameByUsernameAndPassword: findUserNameByUsernameAndPassword,
    checkUserInUsers: checkUserInUsers,
    validPassword: validPassword
};