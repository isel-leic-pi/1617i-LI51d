'use strict';

const SESSION_USER = 'SESSION_USER'

module.exports = {
    'initialize': initialize,
    'authenticate':authenticate,
    'use': use,
    'deserializeUser': deserializeUser,
    'serializeUser': serializeUser
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
 * A function that converts a User into a User Id
 * 
 */
let serializeHandler


/**
 * Passport API
 */
function use(strat) {
    strategy = strat
}

function deserializeUser(func) {
    deserializeHandler = func
}

function serializeUser(func) {
    serializeHandler = func
}

function initialize(){
    return (req, res, next) => {
        if(req.cookies && req.cookies[SESSION_USER]) {
            const userId = req.cookies[SESSION_USER]
            /**
             * const user = JSON.parse(jsonUser)
             */
            deserializeHandler(userId, (err, user) => {
                req.user = user
                next()
            })
        }
        else
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
            serializeHandler(user, (err, userId) => {
                res.cookie(SESSION_USER, userId)
                /**
                 * 2. Redireccionar para a raíz da Aplicaçao 
                 */
                res.redirect(302, '/')
            })
        })       
    }
}