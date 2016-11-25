'use strict';

const SESSION_USER = 'SESSION_USER'

module.exports = {
    'initialize': initialize,
    'authenticate':authenticate,
    'use': use
}

/**
 * Strategy object with properties:
 * - name -- stringify
 * - autenticate -- method: (req, cb) -> void
 */
let strategy

function use(strat) {
    strategy = strat
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
        strategy.authenticate(req, (err, user) => {
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