"use strict";

const fs = require('fs')

/*
 * Passa ao callback (cb) um array com os nomes dos ficheiros
 */ 
function getFilesNamesAsync(path, cb) {
    fs.readdir(path, (err, lst) => {
        if(err != null) cb(err)
        else cb(null, lst)
    })
}

/*
 * Passa ao cb um array, onde cada elemento é um objecto com 2 propriedades:
 *     * name -- nome do ficheiro
 *     * nrOfLines -- numero de linhas desse ficheiro
 */
function getFilesNrOfLinesAsync(path, cb) {
    const lst = fs.readdirSync(path)    // [String] => com os nomes dos ficheiros
    const res = []
    lst.forEach(name => nrOfLinesAsync(path, name, (err, totalLines) => {
        if(err != null) cb(err)
        else {
            const f = new FileInfo(name, totalLines)
            res.push(f)
            if(res.length == lst.length) cb(null, res)
        }
    }))
}

function nrOfLinesAsync(path, fileName, cb) {
    fs.readFile(path + '\\' + fileName, (err, data) => {
        if(err != null) cb(err)
        else cb(null, data.toString().split('\n').length)
    })
}

function FileInfo(name, totalLines) {
    this.name = name
    this.nrOfLines = totalLines
    this.toString = function() {
        return this.name + ', ' + this.nrOfLines + ' lines'
    }
}

/*
module.exports.ls = getFilesNames
module.exports.countLines = getFilesNrOfLines
*/

module.exports = getFilesNrOfLinesAsync
module.exports.ls = getFilesNamesAsync
