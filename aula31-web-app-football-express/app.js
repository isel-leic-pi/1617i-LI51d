'use strict'

/**
 * Import npm modules
 */
const path = require('path')
const fs = require('fs')
const connect = require('express')
const expressSession = require('express-session')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const passportStrategy = require('passport-local').Strategy
const connectCtr = require('connect-controller')

/**
 * Import local modules
 */
const football = require('./controllers/football.js')
const footballController = connectCtr(football)      // Auto binds football methods to routes
const usersService = require('./model/usersService.js')

/**
 * View engine setup
 */
const server = connect()
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'hbs')

/**
 * Setup Passport
 */
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
server.use(favicon(__dirname + '/public/luma.ico'))
server.get('/', (req, res) => res.redirect('/leagues'))
server.use(cookieParser())
server.use(bodyParser())
server.use(connect.static(path.join(__dirname, 'public')))
server.use(expressSession({ secret: 'space odity' }))
server.use(passport.initialize())
server.use(passport.session())
server.use(footballController)
server.post('/login', passport.authenticate(
    'local', 
    { successRedirect: '/'}))


/**
 * catch 404 and forward to error handler
 */ 
server.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

/**
 * error handler prints stacktrace
 */
server.use(function(err, req, res, next) {
    if(!err.status) err.status = 500
    res.status(err.status)
    res.render('error', {
        message: err.message,
        error: err
    })
})

module.exports = server