"use strict";

const http = require('http')

/**
 * Does a HTTP get request and converts the JSON result to a Javascript object.
 */
module.exports = function(path, cb){
    http.get(path, (resp) => {
        let res = ''
        resp.on('error', cb)
        resp.on('data', chunck => res += chunck.toString())
        resp.on('end', () => {
            cb(null, JSON.parse(res))
        })
    })    
}
