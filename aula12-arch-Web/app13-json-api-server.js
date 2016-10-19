"use strict";

if(process.argv.length < 3) throw Error('Please provide the Server Port')
 
const port = process.argv[2]

const http = require('http')
const url = require('url')

const handlers = {}
handlers.parsetime = function() {
    const dt = new Date()
    const time = {
        "hour": dt.getHours(),
        "minute": dt.getMinutes(),
        "second": dt.getSeconds()
    }
    return JSON.stringify(time)
}

handlers.unixtime = function() {
    const dt = new Date()
    const time = {
        "unixtime": dt.getTime()
    }
    return JSON.stringify(time)
}

handlers.ola = function() {
    return 'Helo World'
}

const server = http.createServer((req, resp) => {
        const urlInfo = url.parse(req.url, true)
        const parts = urlInfo.pathname.split('/')
        const endPoint = parts[parts.length -1]
        if(handlers.hasOwnProperty(endPoint)) {
            resp.writeHead(200, { 'Content-Type': 'application/json' })
            const content = handlers[endPoint]()
            resp.write(content)
        } else {
            resp.writeHead(404)
        }
        // resp.end()
})

server.listen(port)
