"use strict";

const port = process.argv[2] | 3000
const fs = require('fs')
const connect = require('connect')
const footballController = require('./controller/footballController.js')
const ecstatic = require('ecstatic')
const favicon = require('serve-favicon')

const server = connect() // Init pipeline
/*
 * Add Middlewares
 */
server.use(favicon(__dirname + '/public/luma.ico'));
server.use(ecstatic({root: __dirname + '/public' }));
server.use(footballController)
/*
 * Run server
 */
server.listen(port)
console.log('HTTP Server running on port ' + port)