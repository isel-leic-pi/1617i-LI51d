"use strict";

if(process.argv.length < 3) throw Error('Please provide the Server Port')
 
const port = process.argv[2]

const http = require('http')
const url = require('url')
const fs = require('fs')
const handlebars = require('handlebars')
const viewParseTime = handlebars.compile(fs.readFileSync('parseTimeView.hbs').toString())
const viewUnixtime = handlebars.compile(fs.readFileSync('unixtime.hbs').toString())

const handlers = {}

handlers.parsetime = function(cb) {
    const dt = new Date()
    const model = {
        'hours': dt.getHours(),
        'minutes': dt.getMinutes(),
        'seconds': dt.getSeconds()
    }
    cb(null, viewParseTime(model))
}

handlers.unixtime = function(cb) {
    const dt = new Date()
    const model = {
        'time': dt.getTime()
    }
    cb(null, viewUnixtime(model))
}

const server = http.createServer((req, resp) => {
        const urlInfo = url.parse(req.url, true)
        const parts = urlInfo.pathname.split('/')
        const endPoint = parts[parts.length -1]
        if(handlers.hasOwnProperty(endPoint))
        {    
            handlers[endPoint]((err, content) => {
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