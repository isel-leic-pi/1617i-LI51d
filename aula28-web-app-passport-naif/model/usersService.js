"use strict";

/**
 * Array of User objects
 */
const dbUsers = require('./usersDb.js')

module.exports = {
    authenticate: authenticate
}

function authenticate(username, passwd, cb) {
    const user = dbUsers.find(item => item.username == username)
    if(!user) return cb(new Error('User does not exists'))
    if(passwd != user.password) return cb(new Error('Invalid password'))
    cb(null, user)
}

