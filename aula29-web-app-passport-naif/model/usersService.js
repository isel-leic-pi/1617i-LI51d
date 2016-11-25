"use strict";

/**
 * Array of User objects
 */
const dbUsers = require('./usersDb.js')

module.exports = {
    'find': find,
    'authenticate': authenticate
}

function find(username, cb) {
    const user = dbUsers.find(item => item.username == username)
    cb(null, user)
}

function authenticate(username, passwd, cb) {
    const user = dbUsers.find(item => item.username == username)
    if(!user) return cb(new Error('User does not exists'))
    if(passwd != user.password) return cb(new Error('Invalid password'))
    cb(null, user)
}

