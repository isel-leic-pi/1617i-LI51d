'use strict';

const SESSION_USER = 'SESSION_USER'

module.exports = {
    'initialize': initialize,
    'authenticate':authenticate,
    'use': use,
    'deserializeUser': deserializeUser
}

/**
 * Strategy object with properties:
 * - name -- stringify
 * - autenticate -- method: (req, cb) -> void
 */
let strategy
/**
 * A function that converts an Id into a User
 * 
 */
let deserializeHandler

/**
 * Passport API
 */
function use(strat) {
    strategy = strat
}

function deserializeUser(func) {
    deserializeHandler = func
}

function initialize(){
    return (req, res, next) => {
        if(req.cookies && req.cookies[SESSION_USER]) {
            const username = req.cookies[SESSION_USER]
            /**
             * const user = JSON.parse(jsonUser)
             */
            deserializeHandler(username, (err, user) => {
                req.user = user
            })
        }
        next()
    }
}

function authenticate(){
    return (req, res, next) => {
        strategy.authenticate(req, (err, user) => {
            if(err) return next(err)
            /**
             * 1. Gravar User ID num cookie 
             */
            res.cookie(SESSION_USER, user.username)
            /**
             * 2. Redireccionar para a raíz da Aplicaçao 
             */
            res.redirect(302, '/')
        })       
    }
}