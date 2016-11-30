'use strict'

const path = require('path');
const fs = require('fs')
const connect = require('express')
const expressSession = require('express-session')
const footballController = require('./controllers/football.js')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const passportStrategy = require('passport-local').Strategy
const usersService = require('./model/usersService.js')

const server = connect() // Init pipeline
passport.use(new passportStrategy((username, password, cb) => {
        usersService.authenticate(
            username, 
            password,
            cb
        )
}))
passport.deserializeUser((userId, cb) => {
    usersService.find(userId, cb)
})
passport.serializeUser((user, cb) => {
    cb(null, user.username)
})

/*
 * Add Middlewares
 */
server.use(favicon(__dirname + '/public/luma.ico'));
server.get('/', (req, res) => res.redirect('/leagues'))
server.use(cookieParser())
server.use(bodyParser())
server.use(connect.static(path.join(__dirname, 'public')));
server.use(expressSession({ secret: 'space odity' }));
server.use(passport.initialize())
server.use(passport.session());
server.use(footballController)
server.post('/login', passport.authenticate(
    'local', 
    { successRedirect: '/'}))


server.use((err, req, resp, next) => {
    resp.writeHead(500)
    resp.write(err.message)
    resp.end() // Termina a ligação
})

server.use((req, resp) => {
    resp.writeHead(404)
    resp.end() // Termina a ligação
})


module.exports = server