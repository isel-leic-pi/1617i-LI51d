"use strict";

if(process.argv.length < 3) throw Error('You must provide the Server Port by argument')
 
const port = process.argv[2]
const net = require('net')
var strftime = require('strftime')

const server = net.createServer(socket => {
    const dt = strftime('%F %R', new Date())
    socket.write(dt)
    socket.write('\n')
    // socket.end() // // Termina a ligação
})

server.listen(port)