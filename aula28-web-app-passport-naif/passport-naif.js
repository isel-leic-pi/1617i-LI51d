'use strict';

const usersService = require('./model/usersService.js')

module.exports = {
    'initialize': initialize,
    'authenticate':authenticate
}

function initialize(){
    return (req, res, next) => {

    }
}

function authenticate(){
    return (req, res, next) => {
        usersService.authenticate(req.query.username, req.query.password, (err, user) => {
            if(err) return next(err)
            res.send(JSON.stringify(user))
        })       
    }
}