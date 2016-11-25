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