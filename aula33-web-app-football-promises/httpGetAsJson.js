"use strict";

const http = require('http')
const q = require('q')

/**
 * Does a HTTP get request and converts the JSON result to a Javascript object.
 */
module.exports = function(path){
    const defer = q.defer()
    http.get(path, (resp) => {
        let res = ''
        resp.on('error', err => defer.reject(err))
        resp.on('data', chunck => res += chunck.toString())
        resp.on('end', () => defer.resolve(JSON.parse(res)))
    })
    return defer.promise
}
