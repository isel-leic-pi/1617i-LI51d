'use strict';

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
        console.log(req.query.username + ' ' + req.query.password)
        res.send('User autenticado: ' + req.query.username + ' ' + req.query.password);
    }
}