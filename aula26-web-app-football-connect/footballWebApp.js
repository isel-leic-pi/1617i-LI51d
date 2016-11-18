"use strict";

const port = process.argv[2] | 3000
const fs = require('fs')
const connect = require('connect')
const url = require('url')
const footballController = require('./controller/footballController.js')
var ecstatic = require('ecstatic');

const server = connect()

server.use(ecstatic({root: __dirname + '/public' }));

server.use((req, resp) => {
        const urlInfo = url.parse(req.url, true)
        const parts = urlInfo.pathname.split('/')
        const endPoint = parts[parts.length -1]

        if(footballController.hasOwnProperty(endPoint))
        {    
            footballController[endPoint](urlInfo.query, (err, content) => {
                if(err) {
                    resp.writeHead(500)
                    resp.write(err)
                }
                else{
                    resp.writeHead(200, { 'Content-Type': 'text/html' })
                    resp.write(content)
                }
                resp.end() // Termina a ligação
            })
        } else {
            resp.writeHead(404)
            resp.end() // Termina a ligação
        }
})

server.listen(port)
console.log('HTTP Server running on port ' + port)