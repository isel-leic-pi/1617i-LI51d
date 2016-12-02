"use strict";

const fs = require('fs')
const connect = require('express')
const expressSession = require('express-session')
const footballController = require('./controller/footballController.js')
const path = require('path')
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
server.use(connect.static(path.join(__dirname, 'public')));
server.use(cookieParser())
server.use(bodyParser())
server.use(expressSession({ secret: 'space odity' }));
server.use(passport.initialize())
server.use(passport.session());
server.use(footballController)
server.post('/login', passport.authenticate(
    'local', 
    { successRedirect: '/'}))


/**
 * Forwards to next Middleware with an Error
 */
server.use((req, res, next) => {
    const err = new Error('Resource not found')
    err.status = 404
    next(err)
})

/**
 * The last Middleware of express pipeline is the Error handler
 */
server.use((err, req, res, next) => {
    if(!err.status) err.status = 500
    res.status(err.status)
    res.send(err.message)
})


module.exports = server