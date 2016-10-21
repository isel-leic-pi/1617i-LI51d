"use strict";

if(process.argv.length < 3) throw Error('Please provide the Server Port')
 
const port = process.argv[2]

const http = require('http')
const url = require('url')
const fs = require('fs')
const sprintf = require('sprintf')

const handlers = {}

handlers.parsetime = function(cb) {
    fs.readFile('parseTimeView.txt', (err, data) => {
        if(err) cb(err)
        const dt = new Date()
        cb(null, sprintf(data.toString(), 
            dt.getHours(),
            dt.getMinutes(),
            dt.getSeconds(),
            dt.getYear(),
            dt.getMonth(),
            dt.getDay()))
    })    
}

handlers.unixtime = function(cb) {
    fs.readFile('unixtime.txt', (err, data) => {
        if(err) cb(err)
        const dt = new Date()
        cb(null, sprintf(data.toString(), dt.getTime()))
    })    
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
