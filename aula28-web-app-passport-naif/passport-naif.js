'use strict';

const usersService = require('./model/usersService.js')
const SESSION_USER = 'SESSION_USER'

module.exports = {
    'initialize': initialize,
    'authenticate':authenticate
}

function initialize(){
    return (req, res, next) => {
        if(req.cookies && req.cookies[SESSION_USER]) {
            const jsonUser = req.cookies[SESSION_USER]
            const user = JSON.parse(jsonUser)
            req.user = user
        }
        next()
    }
}

function authenticate(){
    return (req, res, next) => {
        usersService.authenticate(req.query.username, req.query.password, (err, user) => {
            if(err) return next(err)
            /**
             * 1. Gravar User num cookie 
             */
            res.cookie(SESSION_USER, JSON.stringify(user))
            /**
             * 2. Redireccionar para a raíz da Aplicaçao 
             */
            res.redirect(302, '/')
        })       
    }
}