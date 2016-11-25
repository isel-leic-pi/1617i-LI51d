"use strict";

const port = process.argv[2] | 3000
const fs = require('fs')
const connect = require('express')
const footballController = require('./controller/footballController.js')
const ecstatic = require('ecstatic')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('./passport-naif.js')
const usersService = require('./model/usersService.js')

const server = connect() // Init pipeline
passport.use({
    name: 'local',
    authenticate: (req, cb) => {
        usersService.authenticate(
            req.query.username, 
            req.query.password,
            cb)
    }
})
/*
 * Add Middlewares
 */
server.use(favicon(__dirname + '/public/luma.ico'));
server.use(ecstatic({root: __dirname + '/public' }));
server.use(cookieParser())
server.use(bodyParser())
server.use(passport.initialize())
server.use(footballController)
server.use('/login', passport.authenticate())


server.use((err, req, resp, next) => {
    resp.writeHead(500)
    resp.write(err.message)
    resp.end() // Termina a ligação
})

server.use((req, resp) => {
    resp.writeHead(404)
    resp.end() // Termina a ligação
})
/*
 * Run server
 */
server.listen(port)
console.log('HTTP Server running on port ' + port)