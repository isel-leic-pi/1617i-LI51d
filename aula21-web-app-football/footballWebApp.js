"use strict";

const port = process.argv[2] | 3000
const fs = require('fs')
const http = require('http')
const url = require('url')
const footballController = require('./controller/footballController.js')


const server = http.createServer((req, resp) => {
        const urlInfo = url.parse(req.url, true)
        const parts = urlInfo.pathname.split('/')
        const endPoint = parts[parts.length -1]
        /**
         * Check if this HTTP request asks for a static resource
         * or a domain resource.
         */
        if(urlInfo.pathname.indexOf('.css') >= 0) {             
            resp.writeHead(200, { 'Content-Type': 'text/css' })
            fs.createReadStream('./public/' + urlInfo.pathname).pipe(resp)
            return
        }

        if(footballController.hasOwnProperty(endPoint))
        {    
            footballController[endPoint](urlInfo.query, (err, content) => {
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