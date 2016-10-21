"use strict";

if(process.argv.length < 3) throw Error('Please provide the Server Port')
 
const port = process.argv[2]

const http = require('http')
const url = require('url')
const sprintf = require('sprintf')

const handlers = {}

const parseTimeView = '' +
'<html>' +
    '<ul>' + 
        '<li>hour: %s</li>' + 
        '<li>minute: %s</li>' + 
        '<li>seconds:%s </li>' + 
    '</ul>' + 
'</html>';

const unixTimeView = '' +
'<html>' +
    '<h1>Unixtime</h1>' + 
    '<h3>%s</h3>'
'</html>';


handlers.parsetime = function() {
    // <=> String.Format do .Net ou Java
    const dt = new Date()
    return sprintf(parseTimeView, dt.getHours(),dt.getMinutes(),dt.getSeconds())
}

handlers.unixtime = function() {
    const dt = new Date()
    return sprintf(unixTimeView, dt.getTime())
}

const server = http.createServer((req, resp) => {
        const urlInfo = url.parse(req.url, true)
        const parts = urlInfo.pathname.split('/')
        const endPoint = parts[parts.length -1]
        if(handlers.hasOwnProperty(endPoint)) {
            resp.writeHead(200, { 'Content-Type': 'text/html' })
            const content = handlers[endPoint]()
            resp.write(content)
        } else {
            resp.writeHead(404)
        }
        resp.end() // Termina a ligação
})

server.listen(port)
