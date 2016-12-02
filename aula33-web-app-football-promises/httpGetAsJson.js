"use strict";

const http = require('http')

/**
 * Does a HTTP get request and converts the JSON result to a Javascript object.
 */
module.exports = function(path){
    const promise = new Promise((resolve, reject) => {
        http.get(path, (resp) => {
            let res = ''
            resp.on('error', err => reject(err))
            resp.on('data', chunck => res += chunck.toString())
            resp.on('end', () => resolve(JSON.parse(res)))
        })
    })
    return promise
}
