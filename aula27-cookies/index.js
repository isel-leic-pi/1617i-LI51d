'use strict';

const cookies = require('cookie-parser')
const connect = require('express')
const server = connect()
const SECRET = 'iselsuper'

server.use(cookies(SECRET))

server.use((req, resp, next) => {
    console.log(req.cookies)
    next()
})

server.use((req, resp, next) => {
    console.log("########################")
    /**
     * Podem ser especificadas outros parametros (expires e path)
     * no 3º parametro options passado ao metodo cookie(..,..,options)
     */
    resp.cookie("dummy", "Demo cookies usage!", {signed: true})
    resp.cookie("foo", "Ole  Ola")
    resp.write("Ola")
    resp.end() // Termina a ligação
})

server.listen(3000)
console.log("Web Server listening on port 3000")