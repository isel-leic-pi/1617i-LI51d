"use strict";

const port = process.argv[2] | 3000
const http = require('http')
const url = require('url')
const timeController = require('./controller/timeController.js')


const server = http.createServer((req, resp) => {
        const urlInfo = url.parse(req.url, true)
        const parts = urlInfo.pathname.split('/')
        const endPoint = parts[parts.length -1]
        if(timeController.hasOwnProperty(endPoint))
        {    
            timeController[endPoint]((err, content) => {
                if(err) {
                    resp.writeHead(500)
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